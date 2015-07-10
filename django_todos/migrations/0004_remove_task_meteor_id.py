# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('django_todos', '0003_auto_20150708_1043'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='meteor_id',
        ),
    ]
