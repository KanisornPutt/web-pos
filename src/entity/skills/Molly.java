package entity.skills;

import entity.base.Agent;

public class Molly extends Skill{
    private int duration = 5;
    public Molly(String name, int price) {
        super(name, price);
    }

    @Override
    public void perform(Agent target) {
        target.setMollied(duration);
    }

    @Override
    public String toString() {
        return super.toString() + "Molly";
    }
}
