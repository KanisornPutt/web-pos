package logic.entity.skills;

import logic.entity.base.Agent;

public abstract class Skill {
    protected String name;
    protected int price;

    public Skill(String name, int price) {
        this.name = name;
        this.price = price;
    }
    public String getName() {
        return name;
    }

    public abstract void perform(Agent target);

    public int getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return getName() + " (" + getPrice() + ") ";
    }
}
