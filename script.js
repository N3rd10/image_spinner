const imageUploadForm = document.getElementById('image-upload-form');
const imageUploadInput = document.getElementById('image-upload');
const uploadButton = document.getElementById('upload-button');
const imageContainer = document.getElementById('image-container');
const imageElement = document.getElementById('image');

let imageUrl = '';
let rotationAngle = 0;

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

  document.addEventListener('mousemove', (e) => {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    rotationAngle += Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    imageElement.style.transform = `rotate(${rotationAngle}deg)`;
  });

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', null, false);
  });
});
