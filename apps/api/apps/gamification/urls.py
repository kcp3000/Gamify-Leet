from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import GamificationViewSet

router = DefaultRouter()
router.register(r'gamification', GamificationViewSet, basename='gamification')

urlpatterns = router.urls
