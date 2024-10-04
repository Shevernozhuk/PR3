// Створення об'єктів character та enemy
const character = {
    name: "Pikachu",
    health: 100,
    maxHealth: 100,
    healthElement: document.getElementById("health-character"),
    progressBarElement: document.getElementById("progressbar-character"),

    updateHealth: function() {
        this.healthElement.textContent = `${this.health} / ${this.maxHealth}`;
        this.progressBarElement.style.width = `${(this.health / this.maxHealth) * 100}%`;
    },

    takeDamage: function(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        this.updateHealth();
    },

    resetHealth: function() {
        this.health = this.maxHealth;
        this.updateHealth();
    }
};

const enemy = {
    name: "Charmander",
    health: 100,
    maxHealth: 100,
    healthElement: document.getElementById("health-enemy"),
    progressBarElement: document.getElementById("progressbar-enemy"),

    updateHealth: function() {
        this.healthElement.textContent = `${this.health} / ${this.maxHealth}`;
        this.progressBarElement.style.width = `${(this.health / this.maxHealth) * 100}%`;
    },

    takeDamage: function(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        this.updateHealth();
    },

    resetHealth: function() {
        this.health = this.maxHealth;
        this.updateHealth();
    }
};

// Функції атаки
const attackButton = document.getElementById("btn-kick");
const harmButton = document.getElementById("btn-harm");

attackButton.addEventListener("click", () => {
    performAttack(character, enemy, 20);
});

harmButton.addEventListener("click", () => {
    performAttackOnlyEnemy(enemy, 30);
});


function performAttackOnlyEnemy(defender, maxDamage) {
    const damage = Math.floor(Math.random() * maxDamage) + 1;
    defender.takeDamage(damage);

    if (defender.health === 0) {
        alert("Вы перемогли Charmander!");
        resetGame();
    }
}

function performAttack(attacker, defender, maxDamage) {
    const damage = Math.floor(Math.random() * maxDamage) + 1;
    defender.takeDamage(damage);

    if (defender.health === 0) {
        alert("Вы перемогли Charmander!");
        resetGame();
    } else if (attacker === character) {
        attackEnemy();
    }
}

function attackEnemy() {
    const damageToCharacter = Math.floor(Math.random() * 20) + 1;
    character.takeDamage(damageToCharacter);

    if (character.health === 0) {
        alert("Вам не пощастило! Ви програли!");
        resetGame();
    }
}

function resetGame() {
    character.resetHealth();
    enemy.resetHealth();
}

// Ініціалізація здоров'я
character.updateHealth();
enemy.updateHealth();
