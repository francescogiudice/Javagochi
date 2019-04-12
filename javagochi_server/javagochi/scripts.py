from javagochi.models import Javagochi, JavagochiExpMap
from items.models import OwnedItem, BaseItem
from users.models import CustomUser
from users.scripts import increase_user_level
from items.scripts import use_item_and_save
from consts import MAX_JAVAGOCHI_LEVEL

def increase_javagochi_level(javagochi, amount_to_increase):
    print(("Increasing experience of {} by {} (starting from {})").format(javagochi.nickname, str(amount_to_increase), javagochi.current_experience))
    if(javagochi.current_level >= MAX_JAVAGOCHI_LEVEL):
        print(("{} already reached maximum level. Returning").format(javagochi.nickname))
        return

    needed_exp = JavagochiExpMap.objects.get(level=javagochi.current_level)

    if(javagochi.current_experience + amount_to_increase >= needed_exp.exp_for_next_level):
        javagochi.current_level += 1
        user = javagochi.owner
        user.coins += needed_exp.coins_reward
        user.save()
        new_amount = amount_to_increase - (needed_exp.exp_for_next_level - javagochi.current_experience)
        javagochi.current_experience = 0
        javagochi.save()
        increase_javagochi_level(javagochi, new_amount)
    else:
        javagochi.current_experience += amount_to_increase
    javagochi.save()

def take_damage(javagochi, amount):
    javagochi.current_health -= amount
    if(javagochi.current_health <= 0):
        javagochi.delete()
    else:
        javagochi.save()

def hunger(javagochi, item):
    javagochi.current_hunger = max(javagochi.current_hunger - item.item.amount_modified, 0)
    javagochi.save()
    use_item_and_save(item)

def cold(javagochi, item):
    javagochi.current_cold = max(javagochi.current_hunger - item.item.amount_modified, 0)
    javagochi.save()
    use_item_and_save(item)

def hot(javagochi, item):
    javagochi.current_hot = max(javagochi.current_hunger - item.item.amount_modified, 0)
    javagochi.save()
    use_item_and_save(item)

switcher = {
    "Hunger": hunger,
    "Cold": cold,
    "Hot": hot
}

def use_item(javagochi_id, item_name, username):
    javagochi = Javagochi.objects.filter(id=javagochi_id).first()
    item_type = BaseItem.objects.filter(name=item_name).first()
    user = CustomUser.objects.filter(username=username).first()

    owned_item = OwnedItem.objects.filter(owner=user, item=item_type).first()

    if(owned_item.amount_owned > 0):
        func = switcher.get(item_type.property_modified, "nothing")
        func(javagochi, owned_item)
        increase_user_level(user, item_type.user_exp_on_use)
        increase_javagochi_level(javagochi, item_type.jc_exp_on_use)