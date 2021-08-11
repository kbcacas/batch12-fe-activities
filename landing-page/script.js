// window.addEventListener('DOMContentLoaded',setup)

// function setup(){

//     const appearOptions = {
//         threshold:1,
//         rootMargin: '0px 0px -200px 0px'
//     };
//     const observer = new IntersectionObserver((entries,observer)=>{
//         entries.forEach(entry=>{
//             if(entry.isIntersecting){
//                 entry.target.classList.add('appear');
//                 observer.unobserve(entry.target);          
//              } else {
//                 return;
//             }
//         })
//     },appearOptions);

//     const headers = document.querySelectorAll('h1');
//     headers.forEach(h1=>observer.observe(h1));
//     const paras = document.querySelectorAll('p');
//     paras.forEach(p => observer.observe(p));
//     const links = document.querySelectorAll('a');
//     links.forEach(a => observer.observe(a));
//     const media = document.querySelector('div')
//     media.forEach(div => observer.observe(div));
// }


// // const section = document.querySelector('section')
// // const sectionTwo =  document.querySelector('.about-container');

// // const sectionTwoOptions = {
// //     rootMargin: "-200px 0px 0px 0px"
// // };

// // const sectionTwoObserver = new IntersectionObserver(function(
// //     entries,
// //     sectionTwoObserver
// //   ) {
// //     entries.forEach(entry => {
// //       if (!entry.isIntersecting) {
// //         section.classList.add("appear");
// //       } else {
// //         section.classList.remove("appear");
// //       }
// //     });
// //   },
// //   sectionTwoOptions);

// //  sectionTwoObserver.observe(sectionTwo)
