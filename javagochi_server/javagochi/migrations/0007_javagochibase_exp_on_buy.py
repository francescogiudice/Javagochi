# Generated by Django 2.1.4 on 2019-04-04 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('javagochi', '0006_auto_20190330_1213'),
    ]

    operations = [
        migrations.AddField(
            model_name='javagochibase',
            name='exp_on_buy',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
