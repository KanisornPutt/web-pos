package logic.entity.skills;

import logic.entity.base.Agent;

public class Smoke extends Skill{
    private int duration = 7;
    public Smoke(String name, int price) {
        super(name, price);
    }

    @Override
    public void perform(Agent target) {
        target.setSmoked(duration);
    }


    @Override
    public String toString() {
        return super.toString() + "Smoke";
    }
}
