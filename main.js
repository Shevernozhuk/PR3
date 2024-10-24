import { Pokemon } from './pokemon.js'
import { generateLog } from './logs.js'

const character = new Pokemon({
    name: "Pikachu",
    health: 100,
    maxHealth: 100,
    healthId: "health-character",
    progressBarId: "progressbar-character"
});

const enemy = new Pokemon({
    name: "Charmander",
    health: 100,
    maxHealth: 100,
    healthId: "health-enemy",
    progressBarId: "progressbar-enemy"
});

let battleLogs = [];

function displayLogs() {
    const logsDiv = document.getElementById("logs");
    logsDiv.innerHTML = battleLogs.map(log => `<p>${log}</p>`).join('');
}

const createClickCounter = (buttonId, maxClicks) => {
    let clickCount = 0;

    return {
        handleClick: () => {
            if (clickCount < maxClicks) {
                clickCount++;
                const remainingClicks = maxClicks - clickCount;
                console.log(`Кнопка ${buttonId} натиснута ${clickCount} разів. Залишилося кліків: ${remainingClicks}`);

                if (clickCount === maxClicks) {
                    console.log(`Кнопка ${buttonId} досягла ліміту натискань!`);
                    document.getElementById(buttonId).disabled = true;
                }
            }
        },
        reset: () => {
            clickCount = 0;
            document.getElementById(buttonId).disabled = false;
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
        resetGame();
    } else if (attacker === character) {
        attackEnemy();
    }

    const log = attacker === enemy ? generateLog(attacker, character, character.damage) : generateLog(attacker, enemy, character.damage);
    battleLogs.unshift(log);
    displayLogs();
}

function attackEnemy() {
    const damageToCharacter = Math.floor(Math.random() * 20) + 1;
    character.takeDamage(damageToCharacter);
    character.damage = damageToCharacter;

    if (character.health === 0) {
        alert("Вам не пощастило! Ви програли!");
        resetGame();
    }
}

function resetGame() {
    battleLogs.splice(0, battleLogs.length);
    character.resetHealth();
    enemy.resetHealth();

    attackButtonHandler.reset();
    harmButtonHandler.reset();

    window.location.reload();
}

// Ініціалізація здоров'я
character.updateHealth();
enemy.updateHealth();
