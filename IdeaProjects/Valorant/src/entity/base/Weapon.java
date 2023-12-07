package entity.base;

public abstract class Weapon {
    protected String name;
    protected int damage;
    protected int price;
    protected int criticalRate;
    protected int criticalDamage;

    protected Weapon(String name, int damage, int price) {
        this.name = name;
        this.damage = damage;
        this.price = price;
    }

    public String toString() {
        return name;
    }
    public int getDamage() {
        return damage;
    }
}
