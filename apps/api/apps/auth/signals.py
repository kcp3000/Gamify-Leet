from django.db.models.signals import post_login, post_logout
from django.dispatch import receiver
from django.contrib.auth import update_session_auth_hash


@receiver(post_login)
def on_post_login(sender, request, user, **kwargs):
    user.streak = getattr(user, 'streak', 0) + 1
    user.save(update_fields=['streak'])


@receiver(post_logout)
def on_post_logout(sender, request, user, **kwargs):
    pass
