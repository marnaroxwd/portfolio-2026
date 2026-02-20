"use strict";

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

document.addEventListener('DOMContentLoaded', () => {

	const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const isMobile = () => window.innerWidth <= 767;

	function scramble(el, originalText) {
		let iteration = 0;
		const step = originalText.length / 6;

		if (el._interval) clearInterval(el._interval);

		el._interval = setInterval(() => {
			el.innerText = originalText
				.split('')
				.map((letter, index) => {
					if (index < iteration) return originalText[index];
					return LETTERS[Math.floor(Math.random() * 26)];
				})
				.join('');

			if (iteration >= originalText.length) {
				clearInterval(el._interval);
				el.innerText = originalText;
			}

			iteration += step;
		}, 60);
	}

	function stopScramble(el, originalText) {
		if (el._interval) clearInterval(el._interval);
		el.innerText = originalText;
	}

	function prepareLink(link) {
		const text = link.textContent.trim();
		link.dataset.value = text;
		link.style.position = 'relative';
		link.innerHTML = '';

		const sizer = document.createElement('span');
		sizer.className = 'glitch-sizer';
		sizer.setAttribute('aria-hidden', 'true');
		sizer.textContent = text;

		const label = document.createElement('span');
		label.className = 'glitch-label';
		label.textContent = text;

		link.appendChild(sizer);
		link.appendChild(label);

		return label;
	}

	// --- Glitch links ---
	const navLinks = document.querySelectorAll('.nav__list--menu .nav__link');
	const footerLinks = document.querySelectorAll('.footer__link');

	[...navLinks, ...footerLinks].forEach(link => {
		const isNavLink = !!link.closest('.nav__list--menu');
		if (isNavLink && isMobile()) return;

		const label = prepareLink(link);
		const original = link.dataset.value;

		link.addEventListener('mouseenter', () => {
			link.classList.remove('is-leaving');
			link.classList.add('is-hovered');
			scramble(label, original);
		});

		link.addEventListener('mouseleave', () => {
			stopScramble(label, original);
			link.classList.remove('is-hovered');
			link.classList.add('is-leaving');

			link.addEventListener('transitionend', () => {
				link.classList.remove('is-leaving');
			}, { once: true });
		});
	});

	// ================================================
	// BOUTON ENVOYER — SCRAMBLE + FOND ANIMÉ
	// ================================================

	document.querySelectorAll('.btn').forEach(btn => {
		const label = btn.querySelector('.btn__label');
		const original = btn.dataset.value;

		btn.addEventListener('mouseenter', () => {
			btn.classList.remove('is-leaving');
			btn.classList.add('is-hovered');
			if (label) scramble(label, original);
		});

btn.addEventListener('mouseleave', () => {
    if (label) stopScramble(label, original);
    btn.classList.remove('is-hovered');
    btn.classList.add('is-leaving');

    btn.querySelector('.btn__inner').addEventListener('transitionend', (e) => {
        if (e.propertyName === 'transform') {
            btn.classList.remove('is-leaving');
        }
    }, { once: true });
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

});