package logic.entity.agent;

import logic.entity.base.Agent;
import logic.entity.skills.Flash;
import logic.entity.skills.Heal;

public class Skye extends Agent {

    public Skye() {
        super("Skye");
        skill1 = new Flash("Guiding Light", 100);
        skill2 = new Heal("Regrowth", 200);
    }

}
