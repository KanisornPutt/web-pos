package entity.hero;

import entity.base.Hero;
import entity.skills.Flashable;
import entity.skills.Healable;

public class Skye extends Hero implements Flashable, Healable {

    public Skye() {
        super("Skye");
    }


    @Override
    public void flashed(Hero target) {
        if (flashReady()) {
            target.setFlashed(6);
        }
    }

    @Override
    public boolean flashReady() {
        return true;
    }

    @Override
    public void Heal(Hero target, int healHp) {
        target.setHp(target.getHp()+30);
    }
}
