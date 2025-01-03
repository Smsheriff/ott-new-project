document.getElementById('profile-logo').onclick = function() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
};

// Hide the dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('#profile-logo')) {
        const dropdown = document.getElementById('dropdown-menu');
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    }
};

function logoutUser() {
    // Your logout functionality here
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    window.location.href = "./Login.html";
}

// profile name code

const profilename = document.getElementById("profile-username")
const storedusername = localStorage.getItem("username");

if(storedusername){
    profilename.textContent = `Welcome, ${storedusername} !`;
}
else{
    profilename.textContent = "Welcome, Guest!";
}