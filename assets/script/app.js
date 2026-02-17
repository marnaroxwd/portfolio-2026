"use strict";

const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav__list--menu');
const menuLinks = document.querySelectorAll('.nav__list--menu .nav__link');

if (burger && menu) {
	// Toggle menu
	burger.addEventListener('click', () => {
		const isOpen = menu.classList.toggle('is-open');
		burger.classList.toggle('is-open');
		burger.setAttribute('aria-expanded', isOpen);
		burger.textContent = isOpen ? 'fermer' : 'menu';
		document.body.style.overflow = isOpen ? 'hidden' : '';
	});

	// Ferme au clic sur un lien
	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			menu.classList.remove('is-open');
			burger.classList.remove('is-open');
			burger.setAttribute('aria-expanded', 'false');
			burger.textContent = 'menu';
			document.body.style.overflow = '';
		});
	});

	// Ferme avec Échap
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && menu.classList.contains('is-open')) {
			menu.classList.remove('is-open');
			burger.classList.remove('is-open');
			burger.setAttribute('aria-expanded', 'false');
			burger.textContent = 'menu';
			document.body.style.overflow = '';
		}
	});
}