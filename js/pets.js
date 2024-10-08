document.addEventListener('DOMContentLoaded', function () {
    const petList = document.getElementById('pet-list');
    const breedFilter = document.getElementById('breed-filter');
    const ageFilter = document.getElementById('age-filter');

    // Load pets data from pets.json
    fetch('js/pets.json')
        .then(response => response.json())
        .then(pets => {
            // Display all pets initially
            displayPets(pets);

            // Filter function
            function filterPets() {
                const selectedBreed = breedFilter.value;
                const selectedAge = ageFilter.value;

                const filteredPets = pets.filter(pet => {
                    return (selectedBreed === 'all' || pet.breed === selectedBreed) &&
                           (selectedAge === 'all' || pet.age === selectedAge);
                });

                displayPets(filteredPets);
            }

            // Event listeners for filters
            breedFilter.addEventListener('change', filterPets);
            ageFilter.addEventListener('change', filterPets);
        })
        .catch(error => console.error('Error loading pets:', error));

    // Function to display pets
    function displayPets(pets) {
        petList.innerHTML = ''; // Clear previous pets

        pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';
            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <h2>${pet.name}</h2>
                <p><strong>Breed:</strong> ${pet.breed} | <strong>Age:</strong> ${pet.age} years</p>
                <p>${pet.description}</p>
                <button>Adopt Me!</button>
            `;
            petList.appendChild(petCard);
        });
    }
});
