const imageContainer = document.querySelector('.img');
const info = document.querySelector('.gif_description');

const gifs = document.querySelectorAll('.gif');

for (const gif of gifs) {
   gif.addEventListener('click', function(event) {
      console.log(event.target);
      imageContainer.src = event.target.src;
      info.innerHTML = event.target.alt;
   })
}


