// Get the current URL path
var path = window.location.pathname;

// Get the navigation links
var navLinks = document.getElementsByClassName("nav-item-header");

// Loop through the navigation links and add the active class to the matching link
for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    var href = link.getAttribute("href");

    // Compare the link's href with the current URL path
    if (href === path) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
}
