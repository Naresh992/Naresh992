from __future__ import annotations

import time
from dataclasses import dataclass
from enum import Enum
from threading import Lock, Thread
from uuid import uuid4


class TryOnJobStatus(str, Enum):
    queued = "queued"
    processing = "processing"
    completed = "completed"
    failed = "failed"


@dataclass
class TryOnJob:
    job_id: str
    status: TryOnJobStatus
    render_mode: str
    created_at: float
    updated_at: float
    progress: int
    result_preview_url: str | None = None
    error: str | None = None


class TryOnJobStore:
    def __init__(self) -> None:
        self._jobs: dict[str, TryOnJob] = {}
        self._lock = Lock()

    def create(self, render_mode: str) -> TryOnJob:
        now = time.time()
        job = TryOnJob(
            job_id=str(uuid4()),
            status=TryOnJobStatus.queued,
            render_mode=render_mode,
            created_at=now,
            updated_at=now,
            progress=0,
        )
        with self._lock:
            self._jobs[job.job_id] = job
        return job

    def get(self, job_id: str) -> TryOnJob | None:
        with self._lock:
            return self._jobs.get(job_id)

    def update(self, job_id: str, **kwargs) -> TryOnJob | None:
        with self._lock:
            job = self._jobs.get(job_id)
            if not job:
                return None
            for key, value in kwargs.items():
                setattr(job, key, value)
            job.updated_at = time.time()
            return job


class TryOnPipelineService:
    def __init__(self, store: TryOnJobStore) -> None:
        self.store = store

    def submit(self, render_mode: str) -> TryOnJob:
        job = self.store.create(render_mode=render_mode)
        Thread(target=self._simulate_worker, args=(job.job_id,), daemon=True).start()
        return job

    def _simulate_worker(self, job_id: str) -> None:
        self.store.update(job_id, status=TryOnJobStatus.processing, progress=20)
        time.sleep(0.1)
        self.store.update(job_id, progress=50)
        time.sleep(0.1)
        self.store.update(job_id, progress=80)
        time.sleep(0.1)
        job = self.store.get(job_id)
        if not job:
            return
        ext = "glb" if job.render_mode == "3d" else "png"
        self.store.update(
            job_id,
            status=TryOnJobStatus.completed,
            progress=100,
            result_preview_url=f"https://cdn.raritone.dev/previews/{job_id}.{ext}",
        )
