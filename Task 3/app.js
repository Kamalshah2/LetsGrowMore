document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;
    const skills = document.getElementById('skills').value;
    const interests = document.getElementById('interests').value;
    const website = document.getElementById('website').value;
    const profilePic = document.getElementById('profilePic').files[0];

    // Display the form values
    const outputDiv = document.getElementById('output');
    const reader = new FileReader();

    reader.onload = function(event) {
        const profilePicURL = event.target.result;
        outputDiv.innerHTML = `
            <h3>Submitted Data:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Skills:</strong> ${skills}</p>
            <p><strong>Interests:</strong> ${interests}</p>
            <p><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></p>
            <p><strong>Profile Picture:</strong></p>
            <img src="${profilePicURL}" alt="Profile Picture">
        `;
    };

    if (profilePic) {
        reader.readAsDataURL(profilePic);
    } else {
        outputDiv.innerHTML = `
            <h3>Submitted Data:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Skills:</strong> ${skills}</p>
            <p><strong>Interests:</strong> ${interests}</p>
            <p><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></p>
            <p><strong>Profile Picture:</strong> No picture uploaded</p>
        `;
    }
});
