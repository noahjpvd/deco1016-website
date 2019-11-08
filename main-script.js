// Main page script for implementing custom carousel controls

// Get all carousel forward and back elements on page
var carouselPrev = document.getElementsByClassName("carousel-prev");
var carouselNext = document.getElementsByClassName("carousel-next");

// Adding event listeners to all carousel forward and back elements on page
for (var i = 0; i < carouselPrev.length; i++) {
  carouselPrev[i].addEventListener("click", function() {
    // Move to previous slide on click
    glide.go("<");
  });
}
for (var i = 0; i < carouselNext.length; i++) {
  carouselNext[i].addEventListener("click", function() {
    // Move to next slide on click
    glide.go(">");
  });
}
