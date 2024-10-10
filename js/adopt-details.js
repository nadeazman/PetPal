// Function to get query parameters from URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('pet'); // Get the "pet" parameter
}

// Load pet details when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const petName = getQueryParams();

    // Fetch the pets data from pets.json
    fetch('js/pets.json')
        .then(response => response.json())
        .then(pets => {
            // Find the pet based on the petName from the query params
            const pet = pets.find(p => p.name.toLowerCase() === petName);

            if (pet) {
                displayPetDetails(pet);
                initializeSwiper();
            } else {
                document.getElementById('pet-details').innerHTML = '<p>Pet not found.</p>';
            }
        })
        .catch(error => console.error('Error fetching pet details:', error));
});

// Function to display pet details on the page
function displayPetDetails(pet) {
    const swiperWrapper = document.getElementById('swiper-wrapper');
    
    // Add images to the Swiper wrapper
    pet.images.forEach(image => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `<img src="${image}" alt="${pet.name}">`;
        swiperWrapper.appendChild(slide);
    });

    // Add the pet's information below the carousel
    const petInfo = document.querySelector('.pet-info');
    
    const ageInYears = Math.floor(pet.age / 12); // Convert months to years
    const months = pet.age % 12; // Remaining months
    const ageString = months > 0 ? `${ageInYears} years and ${months} months` : `${ageInYears} years`;

    petInfo.innerHTML = `
        <h1>${pet.name}</h1>
        <p><strong>Breed:</strong> ${pet.breed}</p>
        <p><strong>Age:</strong> ${ageString}</p>
        <p><strong>Description:</strong> ${pet.description}</p>
    `;
}

// Initialize Swiper after the images are loaded
function initializeSwiper() {
    new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        spaceBetween: 10,
    });
}

// Optional: Add form handling code (if you're submitting the form to a backend or an email service)
document.getElementById('adoption-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // You can add form submission logic here (e.g., send to a backend or use a service like Formspree)
    alert(`Thank you, ${name}, for your interest in adopting ${getQueryParams()}!`);
});
