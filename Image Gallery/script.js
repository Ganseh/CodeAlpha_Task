// Select Elements
const images = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const thumbnails = document.querySelector(".thumbnails");

let currentIndex = 0;

// Create Thumbnails
images.forEach((image, index) => {

    let thumb = document.createElement("img");
    thumb.src = image.src;

    thumb.onclick = function () {
        showImage(index);
    };

    thumbnails.appendChild(thumb);

});

// Open Lightbox
images.forEach((image, index) => {

    image.addEventListener("click", function () {

        lightbox.style.display = "flex";
        showImage(index);

    });

});

// Show Image
function showImage(index) {

    currentIndex = index;

    lightboxImage.src = images[currentIndex].src;

    // Highlight Active Thumbnail
    let thumbs = thumbnails.querySelectorAll("img");

    thumbs.forEach(img => img.classList.remove("active"));

    thumbs[currentIndex].classList.add("active");

}

// Next Image
nextBtn.onclick = function () {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    showImage(currentIndex);

};

// Previous Image
prevBtn.onclick = function () {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    showImage(currentIndex);

};

// Close Lightbox
closeBtn.onclick = function () {

    lightbox.style.display = "none";

};

// Close When Clicking Outside Image
lightbox.onclick = function (event) {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

};

// Keyboard Controls
document.addEventListener("keydown", function (event) {

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            nextBtn.click();
        }

        if (event.key === "ArrowLeft") {
            prevBtn.click();
        }

        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }

    }

});

// Filter Buttons
const buttons = document.querySelectorAll(".filter-buttons button");
const cards = document.querySelectorAll(".card");

buttons.forEach(button => {

    button.addEventListener("click", function () {

        // Active Button
        buttons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        let filter = this.getAttribute("data-filter");

        cards.forEach(card => {

            if (filter === "all") {
                card.style.display = "block";
            } else if (card.classList.contains(filter)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});