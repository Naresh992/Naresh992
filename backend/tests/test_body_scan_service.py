from app.services.body_scan import BodyScanMeasurementService


def test_estimate_from_mediapipe_landmarks() -> None:
    service = BodyScanMeasurementService()
    landmarks = [
        {"index": 0, "x": 0.50, "y": 0.10, "visibility": 0.99},
        {"index": 11, "x": 0.38, "y": 0.28, "visibility": 0.98},
        {"index": 12, "x": 0.62, "y": 0.28, "visibility": 0.98},
        {"index": 23, "x": 0.43, "y": 0.56, "visibility": 0.97},
        {"index": 24, "x": 0.57, "y": 0.56, "visibility": 0.97},
        {"index": 27, "x": 0.44, "y": 0.92, "visibility": 0.96},
        {"index": 28, "x": 0.56, "y": 0.92, "visibility": 0.96},
    ]

    estimate = service.estimate_from_landmarks(
        landmarks,
        image_width_px=1080,
        image_height_px=1920,
        reference_height_cm=175,
    )

    assert estimate.source == "mediapipe-pose-landmarks"
    assert estimate.confidence > 0.9
    assert estimate.measurements["height_cm"] == 175
    assert estimate.measurements["shoulder_cm"] >= 34
    assert estimate.measurements["hips_cm"] >= 72
