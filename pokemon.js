export class Pokemon {
    constructor({ name, health, maxHealth, healthId, progressBarId }) {
        this.name = name;
        this.health = health;
        this.maxHealth = maxHealth;
        this.healthElement = document.getElementById(healthId);
        this.progressBarElement = document.getElementById(progressBarId);
        this.updateHealth();
    }

    updateHealth() {
        const { health, maxHealth, healthElement, progressBarElement } = this;
        healthElement.textContent = `${health} / ${maxHealth}`;
        progressBarElement.style.width = `${(health / maxHealth) * 100}%`;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        this.updateHealth();
    }

    resetHealth() {
        this.health = this.maxHealth;
        this.updateHealth();
    }
}