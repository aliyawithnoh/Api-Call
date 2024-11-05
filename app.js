const API_KEY = '46819647-e01ced3afe04f6b327987722d'; 
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.getElementById('close');

// Fetch random images and display them on page load
function fetchRandomImages() {
    fetch(`https://pixabay.com/api/?key=${API_KEY}&image_type=photo&per_page=36`) // Fetch 
        .then(response => response.json())
        .then(data => {
            gallery.innerHTML = ''; // Clear the gallery
            data.hits.forEach(image => {
                displayImage(image);
            });
        })
        .catch(err => console.error(err));
}

document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search').value;
    fetchImages(searchTerm);
});

// matching the search term
function fetchImages(query) {
    fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=12`)
        .then(response => response.json())
        .then(data => {
            gallery.innerHTML = ''; // Clear the gallery
            data.hits.forEach(image => {
                displayImage(image);
            });
        })
        .catch(err => console.error(err));
}

// Display a single image in the gallery
function displayImage(image) {
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    imgElement.addEventListener('click', () => openModal(image));
    gallery.appendChild(imgElement);
}

// Open the modal with image details
function openModal(image) {
    modal.style.display = 'block';
    modalImage.src = image.largeImageURL;
    modalInfo.innerHTML = `<h2>${image.user}</h2><p>${image.tags}</p><a href="${image.pageURL}" target="_blank">View on Pixabay</a>`;
}

// Close the modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal if clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Call the function to fetch and display random images on page load
fetchRandomImages();
