
function getAllFormValues() {
    const formValues = {};

    // Retrieve all form elements by their names
    const formElements = document.forms[0].elements;

    
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.type !== 'submit') { // Exclude submit buttons
            formValues[element.name] = element.value;
        }
    }

    return formValues;
}

// Function to handle form submission
  let isEditing = false;
  let id;

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    // Get all form values
    const formValues = getAllFormValues();

    if(!isEditing)
    axios.post('http://localhost:3000/submit', formValues)
        .then(res => {
           console.log(res)})
        .catch(err => alert(err));
   

    else{
        axios.put(`http://localhost:3000/update/${id}`, formValues)
        .then(res => console.log(res))
        .catch(err => alert("Cannot update the data"));
    }

    document.querySelector("form").reset();

});

// handle the search and display
document.getElementById('searchButton').addEventListener('click', () => {
    // ...
    const playerName = document.getElementById('search-input').value;
    const playerProfile = document.getElementById('playerProfile');
    console.log(playerName)
    axios.get(`http://localhost:3000/search/${playerName}`)
        .then(response => response.data)
        .then(data => {
            console.log(data);
            
                console.log(data);
                playerProfile.style.display = 'block';
                playerProfile.innerHTML = `
               
                <div style="display: flex;">
                    <div style="flex: 1;">
                    <img src="${data.player.photo}" alt="${data.player.name}" style="max-width: 100%;">
                        <h2>${data.player.name}</h2>
                        <p>Date of Birth: ${data.player.dob}</p>
                        <p>Birthplace: ${data.player.birthplace}</p>
                        <p>Matches: ${data.player.matches}</p>
                        <p>Score: ${data.player.score}</p>
                        <p>Fifties: ${data.player.fifties}</p>
                        <p>Centuries: ${data.player.centuries}</p>
                        <p>Wickets: ${data.player.wickets}</p>
                        <p>Average: ${data.player.average}</p>
                    </div>
                    <div style="flex: 3; margin-top:180px">
                        <h2>Summary:</h2>
                        <p>${data.player.summary}</p>
                    </div>
                </div>
                <button id="editButton" style="background-color: #007bff; color: #fff; margin-top: 10px; 
                    border: none; padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer; display: block; margin-bottom: 20px;">Edit</button>
            `;
            

                // Add an event listener for the "Edit" button
                document.getElementById('editButton').addEventListener('click', () => {
                    
                    isEditing = true;
                    id = data.player.id;
                    document.getElementById('name').value = data.player.name;
                    document.getElementById('dob').value = data.player.dob;
                    document.getElementById('photo').value = data.player.photo;
                    document.getElementById('birthplace').value = data.player.birthplace;
                    document.getElementById('summary').value = data.player.summary;
                    document.getElementById('matches').value = data.player.matches;
                    document.getElementById('score').value = data.player.score;
                    document.getElementById('fifties').value = data.player.fifties;
                    document.getElementById('centuries').value = data.player.centuries;
                    document.getElementById('wickets').value = data.player.wickets;
                    document.getElementById('average').value = data.player.average;
                    // Hide the player profile and show the form for editing
                    playerProfile.style.display = 'none';
                    document.querySelector("form").style.display = 'block';
                });
           
             
        })
        .catch(error => {
            playerProfile.innerHTML = 'Player not found';
            console.error(error);
        });
});

