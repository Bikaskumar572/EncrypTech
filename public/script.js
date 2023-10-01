document.getElementById("all-details").addEventListener("submit", function (e) {
    e.preventDefault();
    // Perform login logic here
    window.location.href = 'userdata.html';
});

document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
    // Perform signup logic here
    window.location.href = 'signup.html';
});