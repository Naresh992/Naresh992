from locust import HttpUser, task, between


class RaritoneUser(HttpUser):
    wait_time = between(1, 3)

    @task(5)
    def health(self):
        self.client.get('/health')

    @task(2)
    def metrics(self):
        self.client.get('/metrics')
