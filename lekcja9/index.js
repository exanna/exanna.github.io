const views = [
   {
      title: "Tytuł pierwszy",
      src: "1.jpg"
   },
   {
      title: "Tytuł drugi",
      src: "2.jpg"
   },
   {
      title: "Tytuł trzeci",
      src: "3.jpg"
   },
];

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const content = document.querySelector('.slide img');

const show = (index) => {
   
   const title = document.querySelector('.header__subtitle');
   title.innerHTML = views[index].title;
   
   const imgContainer = document.querySelector('.content');
   imgContainer.innerHTML = '';
   
   const img = document.createElement('img');
   img.src = `img/${views[index].src}`;
   imgContainer.append(img);
}

let slideNr = 0;
show(slideNr);

const changeSlide = (direction) => {

   if (direction == 'left') {
      slideNr--;
      if(slideNr < 0) {
         slideNr = views.length - 1;
      } 
   }
   
   else {
      slideNr++;
      if (slideNr > views.length - 1) {
         slideNr = 0;
      }
   }
   
   console.log(slideNr);
   show(slideNr);
}

leftArrow.addEventListener('click', () => changeSlide('left'));
rightArrow.addEventListener('click', () => changeSlide('right'));

