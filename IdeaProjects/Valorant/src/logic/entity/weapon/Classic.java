package logic.entity.weapon;

import logic.entity.base.Weapon;

public class Classic extends Weapon {
    public Classic() {
        super("Classic", 12, 0);
        this.criticalDamage = 24;
        this.criticalRate = 10;
    }
}
