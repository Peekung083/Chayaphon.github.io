let bikes = [
    {
        "id": 1,
        "model": "Ninja H2R",
        "year": 2023,
        "engine": "998cc Supercharged",
        "price": "฿2,500,000",
        "description": "The ultimate track-focused hyperbike with supercharged engine",
        "image": "img/download.jpeg"
    },
    {
        "id": 2,
        "model": "Ninja ZX-10R",
        "year": 2023,
        "engine": "998cc",
        "price": "฿1,200,000",
        "description": "World Superbike Championship winning superbike",
        "image": "img/zx10r.jpeg"
    }
];
let isEditing = false;
let currentEditId = null;


// DOM Elements
const bikeForm = document.getElementById('bikeForm');
const bikesList = document.getElementById('bikesList');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Display bikes in the list
function displayBikes() {
    bikesList.innerHTML = '';
    
    if (bikes.length === 0) {
        bikesList.innerHTML = '<p>No bikes available. Add a new bike to get started.</p>';
        return;
    }

    bikes.forEach(bike => {
        const bikeCard = document.createElement('div');
        bikeCard.className = 'bike-card';
        bikeCard.innerHTML = `
            <div class="bike-info">
                <h3>${bike.model} (${bike.year})</h3>
                <p><strong>Engine:</strong> ${bike.engine}</p>
                <p><strong>Price:</strong> ${bike.price}</p>
                <p>${bike.description}</p>
                ${bike.image ? `<img src="${bike.image}" alt="${bike.model}" class="bike-image">` : ''}
            </div>
            <div class="bike-actions">
                <button class="edit-btn" onclick="editBike(${bike.id})">Edit</button>
                <button class="delete-btn" onclick="deleteBike(${bike.id})">Delete</button>
            </div>
        `;
        bikesList.appendChild(bikeCard);
    });
}

// Add new bike
function addBike(event) {
    event.preventDefault();
    
    const newBike = {
        id: bikes.length > 0 ? Math.max(...bikes.map(b => b.id)) + 1 : 1,
        model: document.getElementById('model').value,
        year: parseInt(document.getElementById('year').value),
        engine: document.getElementById('engine').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value
    };

    if (isEditing) {
        const index = bikes.findIndex(b => b.id === currentEditId);
        bikes[index] = newBike;
        isEditing = false;
        currentEditId = null;
        submitBtn.textContent = 'Add Bike';
        cancelBtn.style.display = 'none';
    } else {
        bikes.push(newBike);
    }

    bikeForm.reset();
    displayBikes();
}

// Edit bike
function editBike(id) {
    const bike = bikes.find(b => b.id === id);
    if (bike) {
        document.getElementById('bikeId').value = bike.id;
        document.getElementById('model').value = bike.model;
        document.getElementById('year').value = bike.year;
        document.getElementById('engine').value = bike.engine;
        document.getElementById('price').value = bike.price;
        document.getElementById('description').value = bike.description;
        document.getElementById('image').value = bike.image;

        isEditing = true;
        currentEditId = id;
        submitBtn.textContent = 'Update Bike';
        cancelBtn.style.display = 'inline-block';
    }
}

// Delete bike
function deleteBike(id) {
    if (confirm('Are you sure you want to delete this bike?')) {
        bikes = bikes.filter(bike => bike.id !== id);
        displayBikes();
    }
}

// Cancel edit
function cancelEdit() {
    bikeForm.reset();
    isEditing = false;
    currentEditId = null;
    submitBtn.textContent = 'Add Bike';
    cancelBtn.style.display = 'none';
}

// Event Listeners
bikeForm.addEventListener('submit', addBike);
cancelBtn.addEventListener('click', cancelEdit);

// Initialize
document.addEventListener('DOMContentLoaded', displayBikes); 