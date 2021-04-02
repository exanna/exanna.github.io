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

currentElement = 1;

const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const content = document.querySelector('.content');


const el = document.createElement('img');
el.src = `img/${views[0].src}`;
content.append(el);

leftBtn.addEventListener('click', (currentEl) => {
   el.src = `img/${views[currentEl].src}`
})