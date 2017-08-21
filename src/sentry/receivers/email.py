from __future__ import absolute_import

from django.db import IntegrityError
from django.db.models.signals import post_save

from sentry.models import Email, UserEmail


def create_email(instance, created, **kwargs):
    if created:
        try:
            Email.objects.create(email=instance.email)
        except IntegrityError:
            pass


post_save.connect(create_email, sender=UserEmail, dispatch_uid="create_email", weak=False)
