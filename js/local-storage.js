document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profile-form');
    
    // Load saved data on page load
    loadFormData();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the values from the form
        const ownerName = document.getElementById('owner-name').value.trim();
        const petName = document.getElementById('pet-name').value.trim();
        const petBreed = document.getElementById('pet-breed').value.trim();
        const petAge = document.getElementById('pet-age').value.trim();

        // Form validation: Ensure all fields are filled in
        if (!ownerName || !petName || !petBreed || !petAge) {
            alert('All fields are required!');
            return; // Stop the form submission if validation fails
        }

        // Save to localStorage if validation passes
        localStorage.setItem('ownerName', ownerName);
        localStorage.setItem('petName', petName);
        localStorage.setItem('petBreed', petBreed);
        localStorage.setItem('petAge', petAge);

        alert('Profile saved successfully!');
    });

    function loadFormData() {
        // Check if data exists in localStorage and load it
        const savedOwnerName = localStorage.getItem('ownerName');
        const savedPetName = localStorage.getItem('petName');
        const savedPetBreed = localStorage.getItem('petBreed');
        const savedPetAge = localStorage.getItem('petAge');

        if (savedOwnerName) document.getElementById('owner-name').value = savedOwnerName;
        if (savedPetName) document.getElementById('pet-name').value = savedPetName;
        if (savedPetBreed) document.getElementById('pet-breed').value = savedPetBreed;
        if (savedPetAge) document.getElementById('pet-age').value = savedPetAge;
    }

    // Event listener to clear profile data
    document.getElementById('clear-data').addEventListener('click', function() {
        // Clear data from localStorage
        localStorage.removeItem('ownerName');
        localStorage.removeItem('petName');
        localStorage.removeItem('petBreed');
        localStorage.removeItem('petAge');
        
        alert('Profile data cleared.');
        location.reload(); // Reload the page to clear the form
    });
});
