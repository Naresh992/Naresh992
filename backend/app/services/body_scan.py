from __future__ import annotations

import base64
import importlib
import importlib.util
from dataclasses import dataclass
from math import dist
from typing import Any


@dataclass(frozen=True)
class BodyScanEstimate:
    measurements: dict[str, float]
    confidence: float
    source: str
    landmarks_detected: int


class BodyScanMeasurementService:
    """Extract body measurements from MediaPipe/OpenCV landmarks or image bytes."""

    default_measurements = {
        "height_cm": 172.0,
        "chest_cm": 96.0,
        "waist_cm": 82.0,
        "hips_cm": 99.0,
        "shoulder_cm": 43.0,
        "leg_cm": 91.0,
    }

    def estimate_from_landmarks(
        self,
        landmarks: list[dict[str, Any]],
        *,
        image_width_px: int = 1080,
        image_height_px: int = 1920,
        reference_height_cm: float = 172.0,
    ) -> BodyScanEstimate:
        if len(landmarks) < 6:
            return BodyScanEstimate(
                measurements=self.default_measurements,
                confidence=0.38,
                source="fallback-default-measurements",
                landmarks_detected=len(landmarks),
            )

        points = self._normalize_landmarks(landmarks, image_width_px, image_height_px)
        nose = self._pick(points, "nose", 0)
        left_shoulder = self._pick(points, "left_shoulder", 11)
        right_shoulder = self._pick(points, "right_shoulder", 12)
        left_hip = self._pick(points, "left_hip", 23)
        right_hip = self._pick(points, "right_hip", 24)
        left_ankle = self._pick(points, "left_ankle", 27)
        right_ankle = self._pick(points, "right_ankle", 28)

        required = [nose, left_shoulder, right_shoulder, left_hip, right_hip, left_ankle, right_ankle]
        if any(point is None for point in required):
            return BodyScanEstimate(
                measurements=self.default_measurements,
                confidence=0.44,
                source="fallback-incomplete-pose",
                landmarks_detected=len(landmarks),
            )

        shoulder_px = dist(left_shoulder, right_shoulder)
        hip_px = dist(left_hip, right_hip)
        ankle_mid_y = (left_ankle[1] + right_ankle[1]) / 2
        body_px = max(ankle_mid_y - nose[1], 1)
        cm_per_px = reference_height_cm / body_px

        shoulder_cm = self._clamp(shoulder_px * cm_per_px, 34.0, 58.0)
        hips_cm = self._clamp(hip_px * cm_per_px * 2.55, 72.0, 132.0)
        chest_cm = self._clamp(shoulder_cm * 2.18, 74.0, 132.0)
        waist_cm = self._clamp((hips_cm * 0.72) + (chest_cm * 0.18), 58.0, 118.0)
        leg_cm = self._clamp((ankle_mid_y - ((left_hip[1] + right_hip[1]) / 2)) * cm_per_px, 64.0, 116.0)

        confidence = self._estimate_confidence(points)
        return BodyScanEstimate(
            measurements={
                "height_cm": round(reference_height_cm, 1),
                "chest_cm": round(chest_cm, 1),
                "waist_cm": round(waist_cm, 1),
                "hips_cm": round(hips_cm, 1),
                "shoulder_cm": round(shoulder_cm, 1),
                "leg_cm": round(leg_cm, 1),
            },
            confidence=confidence,
            source="mediapipe-pose-landmarks",
            landmarks_detected=len(landmarks),
        )

    def estimate_from_image_base64(
        self,
        image_base64: str,
        *,
        reference_height_cm: float = 172.0,
    ) -> BodyScanEstimate:
        cv2_spec = importlib.util.find_spec("cv2")
        mediapipe_spec = importlib.util.find_spec("mediapipe")
        if cv2_spec is None or mediapipe_spec is None:
            return BodyScanEstimate(
                measurements=self.default_measurements,
                confidence=0.32,
                source="fallback-install-opencv-mediapipe",
                landmarks_detected=0,
            )

        cv2 = importlib.import_module("cv2")
        mediapipe = importlib.import_module("mediapipe")
        numpy = importlib.import_module("numpy")

        image_bytes = base64.b64decode(image_base64)
        image_array = numpy.frombuffer(image_bytes, dtype=numpy.uint8)
        frame = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        if frame is None:
            return BodyScanEstimate(
                measurements=self.default_measurements,
                confidence=0.24,
                source="fallback-invalid-image",
                landmarks_detected=0,
            )

        image_height_px, image_width_px = frame.shape[:2]
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        pose = mediapipe.solutions.pose.Pose(static_image_mode=True, model_complexity=2)
        result = pose.process(rgb_frame)
        pose.close()
        if not result.pose_landmarks:
            return BodyScanEstimate(
                measurements=self.default_measurements,
                confidence=0.28,
                source="fallback-no-pose-detected",
                landmarks_detected=0,
            )

        landmarks = [
            {"index": index, "x": point.x, "y": point.y, "z": point.z, "visibility": point.visibility}
            for index, point in enumerate(result.pose_landmarks.landmark)
        ]
        return self.estimate_from_landmarks(
            landmarks,
            image_width_px=image_width_px,
            image_height_px=image_height_px,
            reference_height_cm=reference_height_cm,
        )

    def _normalize_landmarks(self, landmarks: list[dict[str, Any]], image_width_px: int, image_height_px: int) -> dict[str, tuple[float, float, float]]:
        points: dict[str, tuple[float, float, float]] = {}
        for fallback_index, landmark in enumerate(landmarks):
            raw_name = str(landmark.get("name", landmark.get("label", fallback_index))).lower()
            index = int(landmark.get("index", fallback_index))
            key = self._canonical_name(raw_name, index)
            x = float(landmark.get("x", 0.0))
            y = float(landmark.get("y", 0.0))
            visibility = float(landmark.get("visibility", landmark.get("score", 1.0)))
            if x <= 1.5 and y <= 1.5:
                x *= image_width_px
                y *= image_height_px
            points[key] = (x, y, visibility)
        return points

    def _pick(self, points: dict[str, tuple[float, float, float]], name: str, index: int) -> tuple[float, float, float] | None:
        return points.get(name) or points.get(str(index))

    def _canonical_name(self, raw_name: str, index: int) -> str:
        aliases = {
            "left shoulder": "left_shoulder",
            "right shoulder": "right_shoulder",
            "left hip": "left_hip",
            "right hip": "right_hip",
            "left ankle": "left_ankle",
            "right ankle": "right_ankle",
        }
        indexed = {
            0: "nose",
            11: "left_shoulder",
            12: "right_shoulder",
            23: "left_hip",
            24: "right_hip",
            27: "left_ankle",
            28: "right_ankle",
        }
        return aliases.get(raw_name.replace("_", " "), indexed.get(index, str(index)))

    def _estimate_confidence(self, points: dict[str, tuple[float, float, float]]) -> float:
        required = ["nose", "left_shoulder", "right_shoulder", "left_hip", "right_hip", "left_ankle", "right_ankle"]
        scores = [points[name][2] for name in required if name in points]
        if not scores:
            return 0.4
        return round(max(0.45, min(sum(scores) / len(scores), 0.98)), 2)

    def _clamp(self, value: float, minimum: float, maximum: float) -> float:
        return max(minimum, min(value, maximum))
