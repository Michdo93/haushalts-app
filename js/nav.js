document.addEventListener('DOMContentLoaded', () => {
  // Active link
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.topnav a:not(.topnav-brand)').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // User info
  const navUser = document.getElementById('nav-user');
  if (navUser) {
    const user = localStorage.getItem('hh_user');
    if (user) {
      navUser.querySelector('span').textContent = user;
    }
    document.getElementById('btn-logout').addEventListener('click', () => {
      api.logout();
      window.location.href = getRootPath() + 'index.html';
    });
  }
});
