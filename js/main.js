// Global Vars
let width = 500,
  height = 0,
  filter = 'none',
  streaming = false;

// Dom Elements
const video = document.getElementById('cam-video'),
  canvas = document.getElementById('canvas'),
  photos = document.getElementById('photos'),
  photoButton = document.getElementById('photo-button'),
  clearButton = document.getElementById('clear-button'),
  photoFilter = document.getElementById('photo-filter');

// Get media
navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then( (stream) => {
    // Link to video source
    video.srcObject = stream;
    // Play video
    video.play();
  })
  .catch( (e) => {
    console.log(`Error: ${e}`);
  });

video.addEventListener('canplay', (e) => {
  if (!streaming) {
    // Set video / canvas height
    height = video.videoHeight / (video.videoWidth / width);

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    streaming = true;
  }
}, false);

// Photo btn event
photoButton.addEventListener('click', (event) => {
  takePicture();

  event.preventDefault();
}, false);

// Filter event
photoFilter.addEventListener('change', (event) => {
  // Set filter to specified option
  filter = event.target.value;
  // Set filter in streaming vid
  video.style.filter = filter;
  event.preventDefault;
})

// Clear event
clearButton.addEventListener('click', (evt) => {
  // Clear photos
  photos.innerHTML = '';
  // reset filter
  filter = 'none';
  // Reset video filter
  video.style.filter = filter;
  // Reset select list
  photoFilter.selectedIndex = 0;
})

// Take picture from canvas
function takePicture() {
  // Create canvas
  const context = canvas.getContext('2d');
  if(width && height) {
    // set canvas properties
    canvas.width = width;
    canvas.height = height;
    // draw video image on canvas
    context.drawImage(video, 0, 0, width, height);

    // Create img from canvas
    const imgUrl = canvas.toDataURL('image/png');

    // Create img element
    const img = document.createElement('img');

    // Set img src
    img.setAttribute('src', imgUrl);

    // Set img filter
    img.style.filter = filter;

    // Add image to photos
    photos.appendChild(img);
  }
}