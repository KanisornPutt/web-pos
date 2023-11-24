package entity.agent;

import entity.base.Agent;
import entity.skills.Flash;
import entity.skills.Heal;

public class Skye extends Agent {

    public Skye() {
        super("Skye");
        skill1 = new Flash("Guiding Light", 100);
        skill2 = new Heal("Regrowth", 200);
    }

}
