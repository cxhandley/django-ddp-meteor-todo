# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('django_todos', '0004_remove_task_meteor_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='private',
            field=models.BooleanField(default=True),
        ),
    ]
