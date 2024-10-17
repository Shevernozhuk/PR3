// Створення об'єктів character та enemy
const createCharacter = ({ name, health, maxHealth, healthId, progressBarId }) => {
    const healthElement = document.getElementById(healthId);
    const progressBarElement = document.getElementById(progressBarId);

    return {
        name,
        health,
        maxHealth,
        healthElement,
        progressBarElement,

        updateHealth() {
            const { health, maxHealth, healthElement, progressBarElement } = this;
            healthElement.textContent = `${health} / ${maxHealth}`;
            progressBarElement.style.width = `${(health / maxHealth) * 100}%`;
        },

        takeDamage(damage) {
            this.health -= damage;
            if (this.health < 0) this.health = 0;
            this.updateHealth();
        },

        resetHealth() {
            this.health = this.maxHealth;
            this.updateHealth();
        }
    };
};

const character = createCharacter({
    name: "Pikachu",
    health: 100,
    maxHealth: 100,
    healthId: "health-character",
    damage: 0,
    progressBarId: "progressbar-character"
});

const enemy = createCharacter({
    name: "Charmander",
    health: 100,
    maxHealth: 100,
    healthId: "health-enemy",
    progressBarId: "progressbar-enemy"
});
let battleLogs = [];

function generateLog(firstPerson, secondPerson, damage){
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${damage}, [${firstPerson.health}/${firstPerson.maxHealth}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${damage}, [${firstPerson.health}/${firstPerson.maxHealth}]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage}, [${firstPerson.health}/${firstPerson.maxHealth}]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${damage}, [${firstPerson.health}/${firstPerson.maxHealth}]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damage}, [${firstPerson.health}/${firstPerson.maxHealth}]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${damage}, [${firstPerson.health}/${firstPerson.maxHealth}]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${damage}, [${firstPerson.health}/${firstPerson.maxHealth}]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${damage}, [${firstPerson.health}/${firstPerson.maxHealth}]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name}случайно влепил стопой в живот соперника. -${damage}, [${firstPerson.health}/${firstPerson.maxHealth}]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${damage}, [${firstPerson.health}/${firstPerson.maxHealth}]`
    ];  
    
    return logs[random(logs.length - 1)];
}

function displayLogs() {
    const logsDiv = document.getElementById("logs");
    logsDiv.innerHTML = battleLogs.map(log => `<p>${log}</p>`).join('');
}

function random(max) {
    return Math.floor(Math.random() * max);
}

const createClickCounter = (buttonId, maxClicks) => {
    let clickCount = 0; // Лічильник кліків

    return {
        handleClick: () => {
            if (clickCount < maxClicks) {
                clickCount++; // Збільшуємо лічильник кліків
                const remainingClicks = maxClicks - clickCount; // Розраховуємо кількість кліків, що залишилися
                console.log(`Кнопка ${buttonId} натиснута ${clickCount} разів. Залишилося кліків: ${remainingClicks}`);

                if (clickCount === maxClicks) {
                    console.log(`Кнопка ${buttonId} досягла ліміту натискань!`);
                    document.getElementById(buttonId).disabled = true; // Вимикаємо кнопку після досягнення ліміту
                }
            }
        },
        reset: () => {
            clickCount = 0; // Скидання лічильника кліків
            document.getElementById(buttonId).disabled = false; // Включаємо кнопку
            console.clear();
        }
    };
};

// Додаємо функцію для підрахунку кліків
const attackButtonHandler = createClickCounter("btn-kick", 7);
const harmButtonHandler = createClickCounter("btn-harm", 7); 

// Функції атаки
const attackButton = document.getElementById("btn-kick");
const harmButton = document.getElementById("btn-harm");

attackButton.addEventListener("click", () => {
    performAttack(character, enemy, 20);
    attackButtonHandler.handleClick();
});

harmButton.addEventListener("click", () => {
    performAttackOnlyEnemy(enemy, 30);
    harmButtonHandler.handleClick();
});

function performAttackOnlyEnemy(defender, maxDamage) {
    const damage = Math.floor(Math.random() * maxDamage) + 1;
    defender.takeDamage(damage);

    if (defender.health === 0) {
        alert(`Вы перемогли ${defender.name}!`);
        resetGame();
    }
}

function performAttack(attacker, defender, maxDamage) {
    const damage = Math.floor(Math.random() * maxDamage) + 1;
    defender.takeDamage(damage);

    if (defender.health === 0) {
        alert(`Вы перемогли ${defender.name}!`);
        character.damage = 0;
        resetGame();
    } else if (attacker === character) {
        attackEnemy();
    }

    const log = attacker === enemy ? generateLog(attacker, character, character.damage) : generateLog(attacker, enemy, character.damage);
    // console.log(log);
    character.damage = 0;
    
    battleLogs.unshift(log);
    displayLogs();
}

function attackEnemy() {
    const damageToCharacter = Math.floor(Math.random() * 20) + 1;
    character.takeDamage(damageToCharacter);
    character.damage = damageToCharacter

    if (character.health === 0) {
        alert("Вам не пощастило! Ви програли!");
        character.damage = 0;
        resetGame();
    }
}

function resetGame() {
    battleLogs.splice(0, battleLogs.length);
    character.resetHealth();
    enemy.resetHealth();

    attackButtonHandler.reset();
    harmButtonHandler.reset();
}

// Ініціалізація здоров'я
character.updateHealth();
enemy.updateHealth();
