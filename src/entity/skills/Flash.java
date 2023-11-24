package entity.skills;

import entity.base.Agent;

public class Flash extends Skill{
    private int duration;

    public Flash(String name, int price) {
        super(name, price);
        duration = 6;
    }

    @Override
    public void perform(Agent target) {
        target.setFlashed(duration);
    }

    @Override
    public String toString() {
        return super.toString() + "Flash";
    }
}
