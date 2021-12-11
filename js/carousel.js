const carouselContainer = document.querySelector("#carousel-container");
const track = document.querySelector(".image-track-container");
const imageContainer = track.querySelector(".image-container");
const slides = Array.from(imageContainer.children);
const nextButton = carouselContainer.querySelector(".carousel-right-btn");
const prevButton = carouselContainer.querySelector(".carousel-left-btn");
const dotNav = carouselContainer.querySelector(".carousel-nav");
const dots = Array.from(dotNav.children);
//FUNCTIONS
const moveSlide = function (currentImage, targetImage, moveAmount) {
  //Shift image container right
  imageContainer.style.transform = "translateX(-" + moveAmount + ")";
  //Now update the current image and the previous image
  currentImage.classList.remove("current-image");
  targetImage.classList.add("current-image");
};
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-dot");
  targetDot.classList.add("current-dot");
};
const hideShowButton = (targetImage) => {
  imageIndex = slides.findIndex((slide) => slide === targetImage);
  if (imageIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (imageIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};
//Place all images side by side
const slideWidth = slides[0].getBoundingClientRect().width;
// slides[0].style.left = `${slideWidth * 0}px`;
// slides[1].style.left = `${slideWidth * 1}px`;
// slides[2].style.left = `${slideWidth * 2}px`;
slides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
});

//When i click right button move slide
nextButton.addEventListener("click", function () {
  //Get current image
  const currentImage = imageContainer.querySelector(".current-image");
  //   console.log(currentImage);
  //Get next image
  const targetImage = currentImage.nextElementSibling;
  //   console.log(nextImage);
  //amount to move by
  const moveAmount = targetImage.style.left;
  //   console.log(moveAmount);
  //Shift image container left
  moveSlide(currentImage, targetImage, moveAmount);
  //Update next dot as we click next button
  const currentDot = dotNav.querySelector(".current-dot");
  const nextDot = currentDot.nextElementSibling;
  updateDots(currentDot, nextDot);
  hideShowButton(targetImage);
});

//When i click left button move slide
prevButton.addEventListener("click", function () {
  //Get current image
  const currentImage = imageContainer.querySelector(".current-image");
  //Get previous Image
  const targetImage = currentImage.previousElementSibling;
  //amount to move by
  const moveAmount = targetImage.style.left;
  //Shift image container right
  moveSlide(currentImage, targetImage, moveAmount);
  //Update next dot as we click next button
  const currentDot = dotNav.querySelector(".current-dot");
  const prevDot = currentDot.previousElementSibling;
  updateDots(currentDot, prevDot);
  hideShowButton(targetImage);
});

//Respond when i click the dots
dotNav.addEventListener("click", function (e) {
  //Get the closest trigger to a button
  const targetDot = e.target.closest("button");
  // console.log(targetDot);
  //Check if a nav button has been clicked
  if (targetDot) {
    const currentImage = imageContainer.querySelector(".current-image");
    // console.log(currentImage);
    const currentDot = dotNav.querySelector(".current-dot");
    // console.log(currentDot);
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    // console.log(targetIndex);
    const targetSlide = slides[targetIndex];
    const moveAmount = targetSlide.style.left;
    moveSlide(currentImage, targetSlide, moveAmount);
    updateDots(currentDot, targetDot);
    //when on first or last image hide left or right button respectively
    if (targetIndex === 0) {
      prevButton.classList.add("is-hidden");
      nextButton.classList.remove("is-hidden");
    } else if (targetIndex === slides.length - 1) {
      nextButton.classList.add("is-hidden");
      prevButton.classList.remove("is-hidden");
    } else {
      nextButton.classList.remove("is-hidden");
      prevButton.classList.remove("is-hidden");
    }
  }
});
