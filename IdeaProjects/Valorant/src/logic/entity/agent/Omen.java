package logic.entity.agent;

import logic.entity.base.Agent;
import logic.entity.skills.Flash;
import logic.entity.skills.Smoke;

public class Omen extends Agent {
    public Omen() {
        super("Omen");
        skill1 = new Smoke("Dark Cover",150);
        skill2 = new Flash("Paranoia",250);
    }
}
