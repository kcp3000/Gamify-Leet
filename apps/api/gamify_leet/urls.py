from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.auth.views import AuthViewSet
from apps.issues.views import IssueViewSet
from apps.gamification.views import GamificationViewSet

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'issues', IssueViewSet, basename='issues')
router.register(r'gamification', GamificationViewSet, basename='gamification')

urlpatterns = [
    path('api/', include(router.urls)),
]
