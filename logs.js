export function generateLog(firstPerson, secondPerson, damage){
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

export function random(max) {
    return Math.floor(Math.random() * max);
}