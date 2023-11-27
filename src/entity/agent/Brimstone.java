package entity.agent;

import entity.base.Agent;
import entity.skills.Flash;
import entity.skills.Molly;
import entity.skills.Smoke;

public class Brimstone extends Agent {
    public Brimstone() {
        super("Brimstone");
        skill1 = new Smoke("Sky Smoke",100);
        skill2 = new Molly("Incendiary",250);
    }
}
