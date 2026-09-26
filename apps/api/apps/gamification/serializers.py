from rest_framework import serializers
from .models import Badge, UserBadge, GamificationProfile


class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['id', 'name', 'description', 'icon', 'points_required', 'created_at']
        read_only_fields = ['id', 'created_at']


class UserBadgeSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer(read_only=True)
    class Meta:
        model = UserBadge
        fields = ['id', 'user', 'badge', 'earned_at']
        read_only_fields = ['id', 'earned_at']


class GamificationProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GamificationProfile
        fields = ['id', 'user', 'total_points', 'current_streak', 'longest_streak', 'level', 'last_activity', 'updated_at']
        read_only_fields = ['id', 'updated_at']
