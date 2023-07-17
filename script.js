let currentPage = 'https://swapi.dev/api/people/';

onload = async () => {
    try {
        await loadCharacters(currentPage);
    }catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }
}

async function loadCharacters(url) {
    const container = document.querySelector('.container');
    container.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("section");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const charNameBG = document.createElement("div");
            charNameBG.className = "char-name-bg";

            const charName = document.createElement("span");
            charName.className = "char-name";
            charName.innerText = `${character.name}`;

            charNameBG.appendChild(charName);
            card.appendChild(charNameBG);

            card.onclick = () => {
                const modal = document.querySelector('.modal');
                modal.style.visibility = 'visible';

                const content = document.querySelector('.content');
                content.innerHTML = '';

                const charImage = document.createElement("div");
                charImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
                charImage.className = 'char-image';

                const name = document.createElement("span");
                name.className = 'char-details';
                name.innerText = `Nome: ${character.name}`;

                const height = document.createElement("span");
                height.className = 'char-details';
                height.innerText = `Altura: ${convertHeight(character.height)}`;

                const mass = document.createElement("span");
                mass.className = 'char-details';
                mass.innerText = `Peso: ${convertMass(character.mass)}`;

                const eyeColor = document.createElement("span");
                eyeColor.className = 'char-details';
                eyeColor.innerText = `Cor dos Olhos: ${convertEyeColor(character.eye_color)}`;

                const birthYear = document.createElement("span");
                birthYear.className = 'char-details';
                birthYear.innerText = `Nascimento: ${convertBirth(character.birth_year)}`;

                content.appendChild(charImage);
                content.appendChild(name);
                content.appendChild(height);
                content.appendChild(mass);
                content.appendChild(eyeColor);
                content.appendChild(birthYear);
            }

            container.appendChild(card);
        });

        const previousButton = document.querySelector('#previous-button');
        const nextButton = document.querySelector('#next-button');

        previousButton.style.visibility = responseJson.previous ? "visible" : "hidden";
        nextButton.style.visibility = responseJson.next ? "visible" : "hidden";

        currentPage = url;
    }catch (error) {
        console.log(error);
    }
}

async function loadNextPage() {
    if(!currentPage) return;

    try {
        const response = await fetch(currentPage);
        const responseJson = await response.json();

        await loadCharacters(responseJson.next);
    }catch (error) {
        console.log(error);
        alert('Erro ao carregar a próxima página');
    }
}

async function loadPreviousPage() {
    if(!currentPage) return;

    try {
        const response = await fetch(currentPage);
        const responseJson = await response.json();

        await loadCharacters(responseJson.previous);
    }catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}

function hideModal() {
    const modal = document.querySelector('.modal');
    modal.style.visibility = 'hidden';
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: 'azul',
        brown: 'castanho',
        green: 'verde',
        yellow: 'amarelo',
        black: 'preto',
        pink: 'rosa',
        red: 'vermelho',
        orange: 'laranja',
        hazel: 'avela',
        unknown: 'desconhecida'
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === 'unknown') 'desconhecida'

    return (height / 100).toFixed(2);
}

function convertMass(mass) {
    if (mass === 'unknown') 'desconhecido'

    return `${mass} kg`;
}

function convertBirth(birth) {
    if (birth === 'unknown') 'desconhecido'

    return birth;
}