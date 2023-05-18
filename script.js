let paragraphs = [...document.querySelectorAll('p')];
let spans =[];

paragraphs.forEach(paragraph => {
  let htmlString = '';
  let pArray = paragraph.textContent.split('');
  for(let i = 0; i< pArray.length; i++){
    htmlString += `<span>${pArray[i]}</span>`;
  }
 paragraph.innerHTML = htmlString; 
  
})

spans = [...document.querySelectorAll('span')];

function revealSpans(){
  for(let i = 0; i < spans.length; i++){
    if(spans[i].parentElement.getBoundingClientRect().top < window.innerHeight / 2){
      let {left, top} = spans[i].getBoundingClientRect();
      top = top - (window.innerHeight * .5);
      let opacityValue = 1 - ((top * .01) + (left * 0.001)) < 0.1 ? 0.1 : 1 - ((top * .01) + (left * 0.001)).toFixed(3);
      opacityValue = opacityValue > 1 ? 1 : opacityValue.toFixed(3);
      spans[i].style.opacity = opacityValue;
    }
  }
}

window.addEventListener('scroll', () => {
  revealSpans()
})
revealSpans()






  gsap.registerPlugin(ScrollTrigger);

const scrubValue = .5;
const overlapAmount = 5; // Adjust this value to control the amount of overlap

ScrollTrigger.create({
  trigger: ".container",
  start: "top top",
  end: () => "+=4000vw" + (document.querySelector('.container').scrollWidth - window.innerWidth),
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
