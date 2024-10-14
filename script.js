const imageUploadForm = document.getElementById('image-upload-form');
const imageUploadInput = document.getElementById('image-upload');
const uploadButton = document.getElementById('upload-button');
const imageContainer = document.getElementById('image-container');
const imageElement = document.getElementById('image');

let imageUrl = '';
let rotationAngle = 0;
let rotationSpeed = 1; // initial rotation speed
let isSpinning = false;

imageUploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = imageUploadInput.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    imageUrl = event.target.result;
    imageElement.src = imageUrl;
  };
  reader.readAsDataURL(file);
});

imageContainer.addEventListener('mousedown', (e) => {
  const startX = e.clientX;
  const startY = e.clientY;

  isSpinning = true;

  document.addEventListener('mousemove', (e) => {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    rotationAngle += Math.atan2(deltaY, deltaX) * (180 / Math.PI) * rotationSpeed;
    imageElement.style.transform = `rotate(${rotationAngle}deg)`;
  });

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', null, false);
    isSpinning = false;
  });
});

// decrease rotation speed over time
setInterval(() => {
  if (isSpinning) {
    rotationSpeed *= 0.99; // decrease rotation speed by 1% every 10ms
    if (rotationSpeed < 0.01) {
      rotationSpeed = 0.01; // minimum rotation speed
    }
  } else {
    rotationSpeed = 1; // reset rotation speed when not spinning
  }
}, 10);
