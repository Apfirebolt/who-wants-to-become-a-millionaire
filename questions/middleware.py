import logging

from django.middleware.common import MiddlewareMixin

class RequestLoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print(f"Received request trace: {request.method} {request.path}")
        return None

    def process_response(self, request, response):
        print(f"Sent response: {response.status_code}")
        return response