// Load all playdates when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadAllPlaydates();

    // Event listener for "Find Playdates Around Me" button
    document.getElementById('find-playdates').addEventListener('click', function () {
        // Check if the browser supports geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showNearbyPlaydates, handleError);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });
});

// Function to load and display all playdates
function loadAllPlaydates() {
    fetch('js/playdates.json')
        .then(response => response.json())
        .then(playdates => {
            const allPlaydates = document.getElementById('all-playdates');
            allPlaydates.innerHTML = ''; // Clear previous playdates

            playdates.forEach(playdate => {
                const playdateDiv = document.createElement('div');
                playdateDiv.classList.add('playdate');

                playdateDiv.innerHTML = `
                    <h3>${playdate.name}</h3>
                    <p>${playdate.description}</p>
                `;

                allPlaydates.appendChild(playdateDiv);
            });
        })
        .catch(error => console.error('Error fetching playdates:', error));
}

// Function to show nearby playdates
function showNearbyPlaydates(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    fetch('js/playdates.json')
        .then(response => response.json())
        .then(playdates => {
            const nearbyPlaydates = playdates.filter(playdate => {
                const distance = calculateDistance(userLat, userLon, playdate.latitude, playdate.longitude);
                return distance <= 10; // Only show playdates within 10 km
            });

            displayNearbyPlaydates(nearbyPlaydates);
        })
        .catch(error => console.error('Error fetching playdates:', error));
}

// Function to display nearby playdates
function displayNearbyPlaydates(playdates) {
    const playdateResults = document.getElementById('playdate-results');
    playdateResults.innerHTML = ''; // Clear previous results

    if (playdates.length > 0) {
        playdates.forEach(playdate => {
            const playdateDiv = document.createElement('div');
            playdateDiv.classList.add('playdate');

            playdateDiv.innerHTML = `
                <h3>${playdate.name}</h3>
                <p>${playdate.description}</p>
                <p><strong>Distance:</strong> ${calculateDistanceFromUser(playdate.latitude, playdate.longitude).toFixed(2)} km</p>
            `;

            playdateResults.appendChild(playdateDiv);
        });
    } else {
        playdateResults.innerHTML = '<p>No playdates found within 10 kilometers of your location.</p>';
    }
}

// Function to calculate the distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Handle errors in getting the user's location
function handleError(error) {
    let message = '';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = 'User denied the request for Geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            message = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            message = 'An unknown error occurred.';
            break;
    }
    alert(message);
}
