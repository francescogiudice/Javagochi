# Generated by Django 2.1.4 on 2019-04-09 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_expmap'),
    ]

    operations = [
        migrations.AddField(
            model_name='expmap',
            name='coins_reward',
            field=models.IntegerField(default=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='customuser',
            name='coins',
            field=models.IntegerField(default=1000),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='level',
            field=models.IntegerField(default=1),
        ),
    ]