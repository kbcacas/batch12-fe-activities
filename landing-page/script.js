const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: '0px 0px -325px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
      }
  });
}, observerOptions);

const observerSlide = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('appear-slide');
          observerSlide.unobserve(entry.target);
      }
  });
}, observerOptions);

window.addEventListener('DOMContentLoaded', (event) => { 

  const faders =Array.from(document.getElementsByClassName('fade-in'));
  for (let fader of faders) {
    observer.observe(fader);  
  }

  const sliders =Array.from(document.getElementsByClassName('slide-in'));
  for(let slider of sliders ){
    observerSlide.observe(slider);
  }

  const slidersLeft =Array.from(document.getElementsByClassName('slide-left'));
  for(let sliderLeft of slidersLeft ){
    observerSlide.observe(sliderLeft);
  }


  });

  const navSlide = () =>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-right');


    let isToggle = false;

    burger.addEventListener('click',()=>{
      const body = document.getElementsByTagName('body');
      
      if(isToggle){
        isToggle=false;
        body[0].style.overflow='scroll';
      }else{
        isToggle=true;
        body[0].style.overflow='hidden';
      }
      nav.classList.toggle('nav-active');
      
    })
  }

  navSlide();