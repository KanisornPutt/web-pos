package logic.entity.agent;

import logic.entity.base.Agent;
import logic.entity.skills.Molly;
import logic.entity.skills.Smoke;

public class Brimstone extends Agent {
    public Brimstone() {
        super("Brimstone");
        skill1 = new Smoke("Sky Smoke",100);
        skill2 = new Molly("Incendiary",250);
    }
}
