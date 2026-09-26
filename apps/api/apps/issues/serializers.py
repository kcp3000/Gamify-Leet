from rest_framework import serializers
from .models import Issue


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ['id', 'title', 'description', 'difficulty', 'status', 'points_reward', 'created_by', 'assignee', 'created_at', 'updated_at', 'completed_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'completed_at']

    def validate(self, attrs):
        if attrs.get('status') == 'completed' and not attrs.get('completed_at'):
            attrs['completed_at'] = None
        return attrs
