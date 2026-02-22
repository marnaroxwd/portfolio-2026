"use strict";

// ================================================
// BURGER MENU
// ================================================

const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav__list--menu');
const menuLinks = document.querySelectorAll('.nav__list--menu .nav__link');

if (burger && menu) {
	burger.addEventListener('click', () => {
		const isOpen = menu.classList.toggle('is-open');
		burger.classList.toggle('is-open');
		burger.setAttribute('aria-expanded', isOpen);
		burger.textContent = isOpen ? 'fermer' : 'menu';
		document.body.style.overflow = isOpen ? 'hidden' : '';
	});

	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			menu.classList.remove('is-open');
			burger.classList.remove('is-open');
			burger.setAttribute('aria-expanded', 'false');
			burger.textContent = 'menu';
			document.body.style.overflow = '';
		});
	});

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

// ================================================
// GLITCH HOVER EFFECT
// ================================================

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function scramble(el, originalText) {
	let iteration = 0;
	const step = originalText.length / 6;
	if (el._interval) clearInterval(el._interval);
	el._interval = setInterval(() => {
		el.textContent = originalText.split('').map((letter, index) => {
			if (index < iteration) return originalText[index];
			return LETTERS[Math.floor(Math.random() * 26)];
		}).join('');
		if (iteration >= originalText.length) {
			clearInterval(el._interval);
			el.textContent = originalText;
		}
		iteration += step;
	}, 60);
}

function stopScramble(el, originalText) {
	if (el._interval) clearInterval(el._interval);
	el.textContent = originalText;
}

document.querySelectorAll('.glitch-link').forEach(link => {
	const text = link.textContent.trim();
	link.innerHTML = '';

	const fill = document.createElement('span');
	fill.className = 'glitch-fill';

	const sizer = document.createElement('span');
	sizer.className = 'glitch-sizer';
	sizer.textContent = text;

	const label = document.createElement('span');
	label.className = 'glitch-label';
	label.textContent = text;

	link.appendChild(fill);
	link.appendChild(sizer);
	link.appendChild(label);

	link.addEventListener('mouseenter', () => {
		link.classList.remove('is-leaving');
		link.classList.add('is-hovered');
		scramble(label, text);
	});

	link.addEventListener('mouseleave', () => {
		stopScramble(label, text);
		link.classList.remove('is-hovered');
		link.classList.add('is-leaving');
		setTimeout(() => link.classList.remove('is-leaving'), 400);
	});
});

// ================================================
// BOUTON ENVOYER
// ================================================

document.querySelectorAll('.btn').forEach(btn => {
	const label = btn.querySelector('.btn__label');
	const original = btn.dataset.value;

	if (!label || !original) return;

	btn.addEventListener('mouseenter', () => {
		btn.classList.remove('is-leaving');
		btn.classList.add('is-hovered');
		scramble(label, original);
	});

	btn.addEventListener('mouseleave', () => {
		stopScramble(label, original);
		btn.classList.remove('is-hovered');
		btn.classList.add('is-leaving');
		setTimeout(() => btn.classList.remove('is-leaving'), 400);
	});
});

// ================================================
// TEXTAREA AUTO-RESIZE
// ================================================

const textarea = document.querySelector('#description');
if (textarea) {
	textarea.addEventListener('input', () => {
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	});
}

