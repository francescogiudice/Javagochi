# Generated by Django 2.1.4 on 2019-04-07 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0002_baseitem_cost'),
    ]

    operations = [
        migrations.AddField(
            model_name='baseitem',
            name='exp_on_buy',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='baseitem',
            name='jc_exp_on_use',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='baseitem',
            name='user_exp_on_use',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
