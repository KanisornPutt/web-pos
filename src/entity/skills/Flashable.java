package entity.skills;

import entity.base.Hero;

public interface Flashable {
    void flashed(Hero target);
    boolean flashReady();
}
