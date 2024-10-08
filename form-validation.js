document.getElementById('profile-form').addEventListener('submit', function(event) {
    const ownerName = document.getElementById('owner-name').value.trim();
    const petName = document.getElementById('pet-name').value.trim();
    const petBreed = document.getElementById('pet-breed').value.trim();
    const petAge = document.getElementById('pet-age').value;

    if (!ownerName || !petName || !petBreed || !petAge) {
        alert('All fields are required!');
        event.preventDefault();  // Prevent form submission
    }
});
// JavaScript Document