/**
 *class "Chargeur (loader) hidden"
 */
// Scroll to top
const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) { // Show backToTopButton
    if(!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  }
  else { // Hide backToTopButton
    if(backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function() {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

// function backToTop() {
//   window.scrollTo(0, 0);
// }

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};

/**
 *class "Chargeur (loader) hidden"
 */
// Scroll to top
const thumbImgCont = document.getElementById('thumbnail-section');
const thumbnails = document.getElementsByClassName('thumbnail');
const fullSizeImgs = document.getElementsByClassName('mySlides');
const captionCont = document.querySelector('.caption-container');
const caption = document.getElementById('caption');
/* Acts as an index to retrieve images from 'thumbnails' and 'fullSizeImgs'; 
used with < and > arrow icons */
let currentImage = 0; 


// Removes 'show' classes from large images
// Removes 'active' class from thumbnails
function reset() {
  for (let img of fullSizeImgs) {
    img.classList.remove('show');
  }
  for (let thumbs of thumbnails) {
    thumbs.firstElementChild.classList.remove('active');
  }
}

// Show larger image based on thumbnail index clicked
thumbImgCont.addEventListener('click', (e) => {
  reset();
  // Find index of thumbnail clicked
  const index = [...thumbnails].indexOf(e.target.parentNode);
  // Use that index to show its corrolating larger IMG
  fullSizeImgs[index].classList.add('show');
  // Set caption using img 'alt' tag
  caption.textContent = e.target.getAttribute('alt');
  // Set global variable for currentImage
  currentImage = index;
  // Alter the thumbnail to show it's selected
  hiLiteThumbnail();
})

function hiLiteThumbnail() {
  let thumbnail = thumbnails[currentImage].firstElementChild;
  thumbnail.classList.add('active');
}

// Get Arrow Advancers to work
function goBack(e) {
  reset();
  if (e.target.classList.contains("prev") && currentImage > 0) {
    currentImage -= 1;
    fullSizeImgs[currentImage].classList.add('show');
    caption.textContent = thumbnails[currentImage].firstElementChild.getAttribute('alt');
    hiLiteThumbnail();
  } else if (e.target.classList.contains("prev") && currentImage === 0) {
    currentImage = thumbnails.length-1;
    fullSizeImgs[currentImage].classList.add('show');
    caption.textContent = thumbnails[currentImage].firstElementChild.getAttribute('alt');
    hiLiteThumbnail();
  }
}

function goFwd(e) {
  reset();
  if (e.target.classList.contains("next") && currentImage < thumbnails.length-1) {
    currentImage += 1;
    fullSizeImgs[currentImage].classList.add('show');
    caption.textContent = thumbnails[currentImage].firstElementChild.getAttribute('alt');
    hiLiteThumbnail(); 
  } else if (e.target.classList.contains("next") && currentImage === thumbnails.length-1) {
    currentImage = 0;
    fullSizeImgs[currentImage].classList.add('show');
    caption.textContent = thumbnails[currentImage].firstElementChild.getAttribute('alt');
    hiLiteThumbnail();  
  }
}

// Listen for back and forward arrow clicks
captionCont.addEventListener('click', (e) => {
  // Allows only the Arrow icons to trigger event handlers
  if (e.target.nodeName !== 'A') return false;
  // Event Handlers
  e.target.classList.contains("next") ? goFwd(e) : goBack(e);  
});