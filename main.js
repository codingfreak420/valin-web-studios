const hamburger = document.querySelector('.navbar-toggle');
const menu = document.querySelector('.navbar-menu');

hamburger.addEventListener('click', function() {
  menu.classList.toggle('active');
});

function adjustTextSize() {
  const div = document.getElementById('myDiv');
  const text = document.getElementById('myText');
  const maxHeight = div.clientHeight;
  
  let fontSize = 100; // Initial font size
  text.style.fontSize = fontSize + 'px';
  
  while (text.offsetHeight > maxHeight) {
    fontSize--;
    text.style.fontSize = fontSize + 'px';
  }
}

window.addEventListener('resize', adjustTextSize);
