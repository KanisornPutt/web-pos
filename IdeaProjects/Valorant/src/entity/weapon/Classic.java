package entity.weapon;

import entity.base.Weapon;

public class Classic extends Weapon {
    public Classic() {
        super("Classic", 12, 0);
        this.criticalDamage = 24;
        this.criticalRate = 10;
    }
}
