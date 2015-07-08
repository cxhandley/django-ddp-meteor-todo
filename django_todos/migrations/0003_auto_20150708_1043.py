# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('django_todos', '0002_task_checked'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='owner',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='username',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
