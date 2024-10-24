import { pokemons } from './pokemons.js'

const getRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    return pokemons[randomIndex];
};

const character = getRandomPokemon();
let enemy = getRandomPokemon();

while (enemy === character) {
    enemy = getRandomPokemon();
}

const renderPokemon = (pokemon, containerClass) => {
    const nameElement = document.getElementById(`name-${containerClass}`);
    const healthElement = document.getElementById(`health-${containerClass}`);
    const progressBarElement = document.getElementById(`progressbar-${containerClass}`);
    const spriteElement = document.querySelector(`.${containerClass} .sprite`);

    nameElement.textContent = pokemon.name;
    healthElement.textContent = `${pokemon.hp} / ${pokemon.hp}`;
    progressBarElement.style.width = '100%';
    spriteElement.src = pokemon.img;
};

renderPokemon(character, 'character');
renderPokemon(enemy, 'enemy');

// Очищуємо контейнер для кнопок
const controlContainer = document.querySelector('.control');
controlContainer.innerHTML = '';

// Створюємо кнопки для всіх атак героя
character.attacks.forEach((attack) => {
    const button = document.createElement('button');
    button.classList.add('button');
    button.innerText = attack.name;
    button.addEventListener('click', () => {
        if (attack.maxCount > 0) {
            // Рандомна шкода у межах minDamage та maxDamage
            const damage = Math.floor(Math.random() * (attack.maxDamage - attack.minDamage + 1)) + attack.minDamage;

            // Зменшуємо здоров'я ворога
            enemy.hp -= damage;
            if (enemy.hp < 0) enemy.hp = 0;  // Не дозволяємо бути менше 0

            // Оновлюємо прогресбар здоров'я ворога
            updateHealth(enemy, 'enemy');

            // Зменшуємо кількість можливих натискань для цієї атаки
            attack.maxCount--;

            // Виводимо в консоль кількість разів, скільки ще можна натискати на кнопку
            console.log(`${attack.name}: ${attack.maxCount} раз(ів) ще можна використати`);

            // Якщо ворог знепритомнів
            if (enemy.hp === 0) {
                alert(`Ви перемогли ${enemy.name}!`);
                resetGame();
            }
        } else {
            console.log(`${attack.name} більше не можна використовувати`);
        }
    });
    document.querySelector('.control').appendChild(button);
});

// Статична кнопка для шкоди обом
const bothDamageButton = document.createElement('button');
bothDamageButton.classList.add('button');
bothDamageButton.textContent = 'Нанести шкоду обом';

bothDamageButton.addEventListener('click', () => {
    const characterDamage = Math.floor(Math.random() * 50) + 10;
    const enemyDamage = Math.floor(Math.random() * 50) + 10;

    character.hp -= characterDamage;
    enemy.hp -= enemyDamage;

    if (character.hp < 0) character.hp = 0;
    if (enemy.hp < 0) enemy.hp = 0;

    updateHealth(character, 'character');
    updateHealth(enemy, 'enemy');

    if (character.hp === 0 && enemy.hp === 0) {
        alert("Обидва покемони знепритомніли!");
        resetGame();
    } else if (character.hp === 0) {
        alert("Ваш герой програв!");
        resetGame();
    } else if (enemy.hp === 0) {
        alert(`Ви перемогли ${enemy.name}!`);
        resetGame();
    }
});

controlContainer.appendChild(bothDamageButton);

const updateHealth = (pokemon, containerClass) => {
    const healthElement = document.getElementById(`health-${containerClass}`);
    const progressBarElement = document.getElementById(`progressbar-${containerClass}`);

    healthElement.textContent = `${pokemon.hp} / ${pokemon.hp}`;
    const healthPercentage = (pokemon.hp / pokemon.maxHealth) * 100;
    progressBarElement.style.width = `${healthPercentage}%`;
};

function resetGame() {
    window.location.reload();
}