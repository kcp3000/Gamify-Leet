from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Issue
from .serializers import IssueSerializer


class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Issue.objects.all()
        difficulty = self.request.query_params.get('difficulty', None)
        status = self.request.query_params.get('status', None)
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        issue = self.get_object()
        issue.status = 'completed'
        issue.completed_at = self.request.build_absolute_uri()
        from django.utils import timezone
        issue.completed_at = timezone.now()
        issue.save()
        return Response({'status': 'completed'})
