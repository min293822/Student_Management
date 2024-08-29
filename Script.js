function saveFormData() {
    // Get form data
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const birthdate = document.getElementById('date').value;
    const gender = document.getElementById('gender').value;
    const country = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const township = document.getElementById('township').value;
    const street = document.getElementById('street').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const workphone = document.getElementById('workphone').value;
    const experience = document.getElementById('experience').value;
    const comment = document.getElementById('comment').value;
 
    // Create an object to store the data
    const studentData = {
        name: `${fname} ${lname}`,
        birthdate: birthdate,
        gender: gender,
        address: `${country}, ${city}, ${township}, ${street}`,
        email: email,
        phone: phone,
        workphone: workphone,
        experience: experience,
        comment: comment,
    };

    // Save the data in localStorage
    localStorage.setItem('studentData', JSON.stringify(studentData));

    // Optionally clear form fields
    document.getElementById('formId').reset();
}

function populateTable() {
    const studentData = JSON.parse(localStorage.getItem('studentData'));

    if (studentData) {
        const tableBody = document.getElementById('tbody');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${studentData.name}</td>
            <td>${studentData.birthdate}</td>
            <td>${studentData.gender}</td>
            <td>${studentData.address}</td>
            <td>${studentData.email}</td>
            <td>${studentData.phone}</td>
            <td>${studentData.workphone}</td>
        `;

        tableBody.appendChild(newRow);

        newRow.addEventListener('click', function() {
            document.getElementById('namestu').textContent = studentData.name;
            document.getElementById('datestu').textContent = studentData.birthdate;
            document.getElementById('genderstu').textContent = studentData.gender;
            document.getElementById('addressstu').textContent = studentData.address;
            document.getElementById('emailstu').textContent = studentData.email;
            document.getElementById('phonestu').textContent = studentData.phone;
            document.getElementById('workphonestu').textContent = studentData.workphone;
            document.getElementById('experiencestu').textContent = studentData.experience;
            document.getElementById('commentstu').textContent = studentData.comment;
            document.getElementById('image').src = JSON.parse(localStorage.getItem('imgElement.src'));
            
            document.getElementById('popupstu').style.display = 'flex';
        });

        document.getElementById('backstu').addEventListener('click', () => {
            document.getElementById('popupstu').style.display = 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // For apply.html
    const submitButton = document.getElementById('subtn');
    if (submitButton) {
        submitButton.addEventListener('click', saveFormData);
    }

    // File input change listener
    const fileInput = document.getElementById('fileInput');
    if (fileInput) { 
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {  // Corrected the typo
                    const imgElement = document.getElementById('preview');
                    imgElement.src = e.target.result;
                  
              localStorage.setItem('imgElement.src', JSON.stringify(imgElement.src)); 
                };
                reader.onerror = function() {
                    console.error("An error occurred while reading the file.");
                };
                reader.readAsDataURL(file);  // Trigger the file reading
            }
        });
    }

    // For home.html
    if (document.getElementById('tbody')) {
        populateTable();
    }
});
