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


gsap.registerPlugin(ScrollTrigger);

//const scrubValue = true;
const scrubValue = 0.5;

let container = document.querySelector('.container')

// const scrollBar = gsap.to('.scrollbar', { x: () => { return window.innerWidth - (150 + 20) }, ease: "none" })

ScrollTrigger.create({
    trigger: ".container",
    start: "top top",
    // end: () => (container.scrollWidth - window.innerWidth),
    end: "+=1000",
    pin: true,
    anticipatePin: 1,
    scrub: scrubValue,
    // animation: scrollBar,
    invalidateOnRefresh: true,
})



let thumbNails = gsap.utils.toArray(".thumbnail");

thumbNails.forEach((thumb, i) => {
 
  if (thumb.classList.contains('fakePin')) {
                
    function prevAll(element) {
      var result = [];

      while (element = element.previousElementSibling)
          result.push(element);
      return result;
    }    
    
    // console.log(prevAll(thumb))
    
    var totalWidthToMove;
    
    function getTotalWidthToMove() {
        
      totalWidthToMove = 0;
      
      prevAll(thumb).forEach((thumbBefore, i) => {

        let style = thumbBefore.currentStyle || window.getComputedStyle(thumbBefore);      
        let marginRight = parseInt(style.marginRight);

        totalWidthToMove += thumbBefore.offsetWidth - 100;
        console.log(totalWidthToMove);

      });    

      return totalWidthToMove;
      
    }
    //getTotalWidthToMove();
    // console.log(totalWidthToMove);
    
    gsap.to(thumb, {
      x: () => { return - getTotalWidthToMove() },
      ease: "none",
      scrollTrigger: {
        trigger: ".wrapper",
        start: 'top top',
        scrub: scrubValue,
        invalidateOnRefresh: true,
        end: () => "+=" + getTotalWidthToMove(),
      }
    });
    
  }
  else {
    
    gsap.to(thumb, {
      x: () => { return - (container.scrollWidth) },
      ease: "none",
      scrollTrigger: {
        trigger: ".wrapper",
        start: 'top top',
        scrub: scrubValue,
        invalidateOnRefresh: true,
        end: () => "+=" + (container.scrollWidth),
      }
    });
    
  }
    
  //console.log(thumb.offsetWidth)
  
});
