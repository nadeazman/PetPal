document.addEventListener('DOMContentLoaded', function() {
    fetch('js/pets.json')
        .then(response => response.json())
        .then(data => {
            const petList = document.getElementById('pet-list');
            data.forEach(pet => {
                const petCard = document.createElement('div');
                petCard.className = 'pet-card';

                petCard.innerHTML = `
                    <img src="${pet.image}" alt="${pet.name}">
                    <h2>${pet.name}</h2>
                    <p><strong>Breed:</strong> ${pet.breed} | <strong>Age:</strong> ${pet.age}</p>
                    <p>${pet.description}</p>
                    <button>Adopt Me!</button>
                `;

                petList.appendChild(petCard);
            });
        })
        .catch(error => console.error('Error loading pets:', error));
});
// JavaScript Document