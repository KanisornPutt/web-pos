package logic.entity.skills;

import logic.entity.base.Agent;

public class Heal extends Skill{
    private int health;
    public Heal(String name, int price) {
        super(name, price);
        health = 50;
    }

    @Override
    public void perform(Agent target) {
        target.setHp(target.getHp() + health);
    }

    public String toString() {
        return super.toString() + "Heal";
    }
}
