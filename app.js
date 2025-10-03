const breedSelect = document.getElementById("breed-select");
const dogImage = document.getElementById("dog-image");
const status = document.getElementById("status");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentImages = [];
let currentIndex = 0;

// Fetch all breeds
async function fetchBreeds() {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();

    const breeds = Object.keys(data.message);
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed;
      option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
      breedSelect.appendChild(option);
    });
  } catch (error) {
    status.textContent = "Failed to load breeds. Please try again.";
    console.error(error);
  }
}

// Fetch images for selected breed
async function fetchBreedImages(breed) {
  try {
    status.textContent = "Loading images...";
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await res.json();

    currentImages = data.message;
    currentIndex = 0;

    if (currentImages.length > 0) {
      showImage(currentIndex);
      status.textContent = "";
    } else {
      dogImage.src = "";
      status.textContent = "No images found for this breed.";
    }
  } catch (error) {
    status.textContent = "Failed to load images. Please try again.";
    console.error(error);
  }
}

// Show image at current index
function showImage(index) {
  dogImage.src = currentImages[index];
}

// Event listeners
breedSelect.addEventListener("change", (e) => {
  const breed = e.target.value;
  if (breed) fetchBreedImages(breed);
});

prevBtn.addEventListener("click", () => {
  if (currentImages.length === 0) return;
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage(currentIndex);
});

// Initialize
fetchBreeds();
