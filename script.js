function adjustTextSize() {
  const div1 = document.getElementById('myDiv1');
  const text1 = document.getElementById('myText1');
  const div2 = document.getElementById('myDiv2');
  const text2 = document.getElementById('myText2');

  const adjustFontSize = (div, text) => {
    const maxHeight = div.clientHeight;
    let fontSize = 150; // Initial font size
    text.style.fontSize = fontSize + 'px';

    while (text.offsetHeight > maxHeight && fontSize > 0) {
      fontSize--;
      text.style.fontSize = fontSize + 'px';
    }
  };

  adjustFontSize(div1, text1);
  adjustFontSize(div2, text2);
}

window.addEventListener('resize', adjustTextSize);





gsap.registerPlugin(ScrollTrigger);

const scrubValue = 2.0;
const overlapAmount = 25; // Adjust this value to control the amount of overlap

ScrollTrigger.create({
  trigger: ".container",
  start: "top top",
  end: () => "+=400" + (document.querySelector('.container').scrollWidth - window.innerWidth),
  pin: true,
  scrub: scrubValue,
});



let thumbNails = gsap.utils.toArray(".thumbnail");
let totalWidthToMove = 0;

thumbNails.forEach((thumb, i) => {
  totalWidthToMove += thumb.offsetWidth - overlapAmount; // Adjust the total width considering the overlap
  gsap.to(thumb, {
    x: () => -(thumb.offsetWidth - overlapAmount) * i, // Adjust the x value to stop at the left side
    ease: "none",
    scrollTrigger: {
      trigger: ".wrapper",
      start: 'top top',
      scrub: scrubValue,
      invalidateOnRefresh: true,
      end: () => "+=" + totalWidthToMove,
    },
  });
});

