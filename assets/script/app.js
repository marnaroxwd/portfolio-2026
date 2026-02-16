"use strict";

const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav__list--menu');

burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen);
    console.log("test");
    
});


