from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Badge, UserBadge, GamificationProfile
from .serializers import BadgeSerializer, UserBadgeSerializer, GamificationProfileSerializer


class GamificationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def profile(self, request):
        profile, created = GamificationProfile.objects.get_or_create(user=request.user)
        serializer = GamificationProfileSerializer(profile)
        return Response(serializer.data)

    def badges(self, request):
        badges = Badge.objects.all()
        serializer = BadgeSerializer(badges, many=True)
        return Response(serializer.data)

    def my_badges(self, request):
        user_badges = UserBadge.objects.filter(user=request.user).select_related('badge')
        serializer = UserBadgeSerializer(user_badges, many=True)
        return Response(serializer.data)

    def leaderboard(self, request):
        profiles = GamificationProfile.objects.order_by('-total_points')[:100]
        serializer = GamificationProfileSerializer(profiles, many=True)
        return Response(serializer.data)
