// main.js
let characterHealth = 100;
let enemyHealth = 100;

const healthCharacterDisplay = document.getElementById("health-character");
const healthEnemyDisplay = document.getElementById("health-enemy");
const progressBarCharacter = document.getElementById("progressbar-character");
const progressBarEnemy = document.getElementById("progressbar-enemy");
const attackButton = document.getElementById("btn-kick");
const harmButton = document.getElementById("btn-harm");

function updateCharacterHealth() {
    healthCharacterDisplay.textContent = `${characterHealth} / 100`;
    progressBarCharacter.style.width = `${(characterHealth / 100) * 100}%`;
}

function updateEnemyHealth() {
    healthEnemyDisplay.textContent = `${enemyHealth} / 100`;
    progressBarEnemy.style.width = `${(enemyHealth / 100) * 100}%`;
}

attackButton.addEventListener("click", () => {
    performAttack(true); // Thunder Jolt - Character attacks
});

harmButton.addEventListener("click", () => {
    harmEnemy(); // Fire Blast - Enemy takes damage only
});

function performAttack(isCharacterAttacking) {
    const damage = Math.floor(Math.random() * 20) + 1;
    if (isCharacterAttacking) {
        enemyHealth -= damage;
        if (enemyHealth < 0) enemyHealth = 0;
        updateEnemyHealth();
        if (enemyHealth === 0) {
            alert("Вы перемогли Charmander!");
            resetHealth();
        } else {
            attackCharacter();
        }
    } else {
        characterHealth -= damage;
        if (characterHealth < 0) characterHealth = 0;
        updateCharacterHealth();
        if (characterHealth === 0) {
            alert("Вам не пощастило! Ви програли!");
            resetHealth();
        }
    }
}

function harmEnemy() {
    const damage = Math.floor(Math.random() * 30) + 1; // Fire Blast does more damage
    enemyHealth -= damage;
    if (enemyHealth < 0) enemyHealth = 0;
    updateEnemyHealth();

    if (enemyHealth === 0) {
        alert("Вы перемогли Charmander!");
        resetHealth();
    }
}

function attackCharacter() {
    const damageToCharacter = Math.floor(Math.random() * 20) + 1;
    characterHealth -= damageToCharacter;

    if (characterHealth < 0) characterHealth = 0;

    updateCharacterHealth();

    if (characterHealth === 0) {
        alert("Вам не пощастило! Ви програли!");
        resetHealth();
    }
}

function resetHealth() {
    characterHealth = 100;
    enemyHealth = 100;
    updateCharacterHealth();
    updateEnemyHealth();
}

updateCharacterHealth();
updateEnemyHealth();