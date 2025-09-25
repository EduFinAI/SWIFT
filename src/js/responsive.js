document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('.header__hamburger-button');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeButton = document.querySelector('.mobile-nav__close-button');

  if (hamburgerButton && mobileNav && closeButton) {
    hamburgerButton.addEventListener('click', () => {
      mobileNav.classList.add('is-open');
    });

    closeButton.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
    });
  }
});
