package entity.base;

import entity.skills.Skill;
import entity.weapon.Classic;

public abstract class Agent extends BaseEntity implements Updatable{
    protected Weapon weapon;
    protected int flashed;
    protected int smoked;
    protected int mollied;
    protected int accuracy;
    protected Skill skill1;
    protected Skill skill2;

    protected Agent(String name, int hp) {
        super(name, hp);
        accuracy = 80;
        flashed = 0;
        smoked = 0;
        weapon = new Classic();
    }

    protected Agent(String name) {
        super(name, 100);
        accuracy = 80;
        flashed = 0;
        weapon = new Classic();
    }

    public void setFlashed(int flashed) {
        if (flashed < 0) flashed = 0;
        this.flashed = flashed;
    }

    public void setSmoked(int smoked) {
        if (smoked < 0) smoked = 0;
        this.smoked = smoked;
    }

    public void setMollied(int mollied) {
        if (mollied < 0) mollied = 0;
        this.mollied = mollied;
    }

    public boolean isFlashed() {
        return flashed > 0;
    }
    public boolean isSmoked() {
        return smoked > 0;
    }
    public boolean isMollied() {
        return mollied > 0;
    }

    public void attack(Agent target) {
        int chance = random.nextInt(100);
        if (chance < getAccuracy() && chance < target.getVisiblity()) {
            System.out.println("Hit for " + weapon.damage + " damage.");
            target.setHp(target.getHp() - weapon.damage);
        }
        else System.out.println("MISS");
    }
    public void setHp(int hp) {
        if (hp > 100)
            hp = 100;
        super.setHp(hp);
    }

    public Weapon getWeapon() {
        return weapon;
    }

    public String toString() {
        String s = " (" + hp + ", " + weapon + ") ";
        if (isFlashed()) s += "(flashed " + flashed + ") ";
        if (isSmoked()) s += "(smoked " + smoked + ") ";
        if (isMollied()) s += "(mollied " + mollied+ ") ";
        return getName() + s;
    }

    public int getAccuracy() {
        int tmp = accuracy;
        if (isFlashed()) tmp = tmp/4;
        if (isSmoked()) tmp = tmp/4;
        return tmp;
    }

    public int getVisiblity(){
        if (isSmoked()) {
            return 50;
        }
        return 100;
    }
    public Skill getSkill1() {
        return skill1;
    }

    public Skill getSkill2() {
        return skill2;
    }

    public void performSkill1(Agent target) {
        skill1.perform(target);
    }
    public void performSkill2(Agent target) {
        skill2.perform(target);
    }
    public void update() {
        setSmoked(this.smoked - 1);
        setFlashed(this.flashed - 1);
        if (isMollied() && mollied < 5) setHp(getHp() - 15);
        setMollied(this.mollied - 1);
    }
}
