document.addEventListener('DOMContentLoaded', function () {
    const petList = document.getElementById('pet-list');
    const animalFilter = document.getElementById('animal-filter');
    const breedFilter = document.getElementById('breed-filter');
    const ageFilter = document.getElementById('age-filter');
    const resetButton = document.getElementById('reset-filters');
    const loadingMessage = document.getElementById('loading-message');

    let pets = []; // To store the loaded pets data

    // Show loading message while fetching data
    loadingMessage.style.display = 'block';

    // Fetch the pets data from pets.json
    fetch('js/pets.json')
        .then(response => response.json())
        .then(data => {
            pets = data; // Assign the fetched pets to the global variable
            loadingMessage.style.display = 'none'; // Hide loading message once data is fetched

            // Display all pets initially
            displayPets(pets);

            // Filter function
            function filterPets() {
                const selectedAnimal = animalFilter.value;
                const selectedBreed = breedFilter.value;
                const selectedAge = ageFilter.value;

                const filteredPets = pets.filter(pet => {
                    const matchesAnimal = selectedAnimal === 'all' || pet.animal === selectedAnimal;
                    const matchesBreed = selectedBreed === 'all' || pet.breed === selectedBreed;
                    const matchesAge = (
                        selectedAge === 'all' ||
                        (selectedAge === '<12' && pet.age < 12) ||
                        (selectedAge === '12-24' && pet.age >= 12 && pet.age < 24) ||
                        (selectedAge === '24-36' && pet.age >= 24 && pet.age < 36) ||
                        (selectedAge === '>36' && pet.age >= 36)
                    );

                    return matchesAnimal && matchesBreed && matchesAge;
                });

                displayPets(filteredPets);
            }

            // Event listeners for filters
            animalFilter.addEventListener('change', filterPets);
            breedFilter.addEventListener('change', filterPets);
            ageFilter.addEventListener('change', filterPets);

            // Event listener for reset button
            if (resetButton) {
                resetButton.addEventListener('click', resetFilters);
            }
        })
        .catch(error => {
            loadingMessage.style.display = 'none';
            console.error('Error loading pets:', error);
        });

    // Function to display pets
    function displayPets(pets) {
        petList.innerHTML = ''; // Clear the previous pets

        pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';

            // Convert pet age from months to years and months
            const ageInYears = Math.floor(pet.age / 12);
            const months = pet.age % 12;
            const ageString = months > 0 ? `${ageInYears} years and ${months} months` : `${ageInYears} years`;

            petCard.innerHTML = `
                <img src="${pet.images[0]}" alt="${pet.name}">
                <h2>${pet.name}</h2>
                <p><strong>Breed:</strong> ${pet.breed} | <strong>Age:</strong> ${ageString}</p>
                <p>${pet.description}</p>
                <button onclick="window.location.href='adopt-details.html?pet=${pet.name.toLowerCase()}';">Adopt Me!</button>
            `;
            petList.appendChild(petCard);
        });
    }

    // Function to reset filters
    function resetFilters() {
        animalFilter.value = 'all';
        breedFilter.value = 'all';
        ageFilter.value = 'all';
        displayPets(pets); // Reset the display to show all pets again
    }
});
