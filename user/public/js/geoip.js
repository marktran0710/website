$(document).ready(function () {
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=b54008d4e54c405f8c17db28499d98fe')
        .then(response => response.json())
        .then(data => {
            // Use the location data to display the user's location
            localStorage.setItem("country", data.country_name)
        })
        .catch(error => {
            // Handle errors
            console.error('Error getting location data:', error);
        }); localStorage.setItem("country", "")
});