# Generated by Django 2.1.4 on 2019-03-30 11:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('javagochi', '0005_auto_20190330_1211'),
    ]

    operations = [
        migrations.AlterField(
            model_name='javagochi',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
