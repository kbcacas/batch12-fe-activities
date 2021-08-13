const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: '0px 0px -200px 0px'
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
  console.log(sliders);
  for(let slider of sliders ){
    observerSlide.observe(slider);
  }
  });

  const navSlide = () =>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-right');

    burger.addEventListener('click',()=>{
      nav.classList.toggle('nav-active');
    })
  }

  navSlide();