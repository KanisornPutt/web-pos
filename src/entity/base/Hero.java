package entity.base;

import entity.weapon.Classic;

public abstract class Hero extends BaseEntity {
    protected Weapon weapon;
    protected int flashed;
    protected int accuracy;

    protected Hero(String name, int hp) {
        super(name, hp);
        accuracy = 80;
        flashed = 0;
        weapon = new Classic();
    }

    protected Hero(String name) {
        super(name, 100);
        accuracy = 80;
        flashed = 0;
        weapon = new Classic();
    }

    public void setFlashed(int flashed) {
        if (flashed < this.flashed) return;
        this.flashed = flashed;
    }
    public boolean isFlashed() {
        return flashed > 0;
    }
    public void attack(Hero target) {
        target.setHp(target.getHp() - weapon.damage);
    }
    public void setHp(int hp) {
        if (hp > 100)
            hp = 100;
        super.setHp(hp);
    }

    public Weapon getWeapon() {
        return weapon;
    }

    public String toString() {
        String s = " (" + hp + ", " + weapon + ") ";
        if (isFlashed()) s += "(flashed " + flashed + ") ";
        return getName() + s;
    }

}
