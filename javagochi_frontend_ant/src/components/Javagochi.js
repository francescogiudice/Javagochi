class Javagochi {
    constructor(data) {
        this.id = data.id;
        this.nickname = data.nickname;

        this.age = data.current_age;
        this.health = data.current_health;
        this.hunger = data.current_hunger;
        this.hot = data.current_hot;
        this.cold = data.current_cold;
        this.level = data.current_level;
        this.experience = data.current_experience;

        this.max_health = data.race.max_health;
        this.max_hunger = data.race.max_hunger;
        this.max_hot = data.race.max_hot;
        this.max_cold = data.race.max_cold;
        this.max_age = data.race.max_age;

        this.race = data.race.race;
        this.image = data.race.image;
    }
}

export default Javagochi
