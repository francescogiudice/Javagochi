from django.db import models
from users.models import CustomUser

class JavagochiBase(models.Model):
    image = models.ImageField(upload_to='javagochi_bases/')
    race = models.CharField(max_length = 256, primary_key = True)
    max_health = models.IntegerField()
    max_hunger = models.IntegerField()
    max_cold = models.IntegerField()
    max_hot = models.IntegerField()
    max_age = models.IntegerField()
    cost = models.FloatField()
    min_user_level = models.IntegerField()
    exp_on_buy = models.IntegerField()

    def __str__(self):
        return self.race

class JavagochiBaseManager(models.Manager):
    def get_by_natural_key(self, race, image):
        return self.get(race=race, image=image)

class Javagochi(models.Model):
    race = models.ForeignKey(JavagochiBase, on_delete = models.CASCADE, blank=False)
    owner = models.ForeignKey(CustomUser, on_delete = models.CASCADE, blank=False)

    nickname = models.CharField(max_length = 256)
    current_health = models.IntegerField()
    current_hunger = models.IntegerField()
    current_cold = models.IntegerField()
    current_hot = models.IntegerField()
    current_age = models.IntegerField(default=1)
    current_level = models.IntegerField(default=1)
    current_experience = models.IntegerField(default=0)

    def __str__(self):
        return self.nickname + ', ' + self.race.race

class JavagochiExpMap(models.Model):
    level = models.IntegerField(primary_key=True)
    exp_for_next_level = models.IntegerField()
    coins_reward = models.IntegerField()

    def __str__(self):
        return str(self.level) + " -> " + str(self.exp_for_next_level)