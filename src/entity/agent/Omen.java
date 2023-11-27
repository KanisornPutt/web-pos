package entity.agent;

import entity.base.Agent;
import entity.skills.Flash;
import entity.skills.Smoke;

public class Omen extends Agent {
    public Omen() {
        super("Omen");
        skill1 = new Smoke("Dark Cover",150);
        skill2 = new Flash("Paranoia",250);
    }
}
