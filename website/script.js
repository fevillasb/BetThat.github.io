// BetThat landing page behavior.

// ---------- reveal-on-scroll ----------
const observer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    }
  },
  { threshold: 0.15 },
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ---------- screenshots: hide any that aren't in assets/ yet ----------
// The page ships with slots for screenshot-1..5.png; missing files vanish
// gracefully instead of showing broken-image icons. If none exist, the whole
// section (and the hero phone) hides until real screenshots are dropped in.
function pruneBrokenImages() {
  const shots = document.querySelectorAll('.shots-row img, .phone .shot');
  let missing = 0;
  shots.forEach((img) => {
    const hide = () => {
      img.style.display = 'none';
      missing += 1;
      const row = document.getElementById('shotsRow');
      if (row && row.querySelectorAll('img:not([style*="none"])').length === 0) {
        const section = document.getElementById('shots');
        if (section) section.style.display = 'none';
      }
      if (img.classList.contains('shot')) {
        const phone = img.closest('.hero-shot');
        if (phone) phone.style.display = 'none';
      }
    };
    if (img.complete && img.naturalWidth === 0) hide();
    else img.addEventListener('error', hide);
  });
}
pruneBrokenImages();

// ---------- links that get real URLs at launch ----------
// TODO(launch): set the real App Store URL once the app is live, e.g.
//   https://apps.apple.com/app/betthat/id<APPLE_ID>
const APP_STORE_URL = '';
// TODO: paste the published Notion support-page URL.
const SUPPORT_URL = '';

const appStoreLink = document.getElementById('appStoreLink');
if (appStoreLink) {
  if (APP_STORE_URL) appStoreLink.href = APP_STORE_URL;
  else
    appStoreLink.addEventListener('click', (e) => {
      e.preventDefault();
      appStoreLink.textContent = 'Coming soon to the App Store';
    });
}

const supportLink = document.getElementById('supportLink');
if (supportLink && SUPPORT_URL) supportLink.href = SUPPORT_URL;

// ---------- footer year ----------
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
