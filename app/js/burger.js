const hb = document.querySelector('.nav__burger');
const menu = document.querySelector('.menu');
const body = document.querySelector('.body');
console.log(body);


hb.addEventListener('click', function(){
   hb.classList.toggle('active');
  menu.classList.toggle('active');
  body.classList.toggle('lock');
})
