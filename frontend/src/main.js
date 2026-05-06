const products = [
  { name: 'Brown Jacket', tone: 'brown' },
  { name: 'Black Jacket', tone: 'black' },
  { name: 'Cream Shirt', tone: 'cream' },
  { name: 'Wide Trouser', tone: 'charcoal' },
];

function button(label, className = 'primary-button') {
  return `<button class="${className}">${label}</button>`;
}

function header(title = 'RARITONE') {
  return `<header class="top-bar"><span class="brand-dot"></span><strong class="brand">${title}</strong><span class="profile-dot">R</span></header>`;
}

function productArt(tone) {
  return `<div class="product-art ${tone}"><span class="hanger"></span><span class="sleeve left"></span><span class="garment-body"></span><span class="sleeve right"></span></div>`;
}

function productCard(product) {
  return `<article class="product-card">${productArt(product.tone)}<button class="try-on">Try-On</button><div class="product-meta"><div><strong>${product.name}</strong><small>Outerwear Men’s</small></div><b>$120</b></div></article>`;
}

const screens = [
  ['Splash', `<section class="phone black-screen splash"><div class="logo-mark">R</div><div><p class="kicker">AI VIRTUAL TRY-ON</p><h2>RARITONE</h2><p>Scan once. Try every product with confidence.</p></div>${button('Start')}</section>`],
  ['Onboarding', `<section class="phone black-screen onboarding"><div class="scan-preview"><span class="avatar-head"></span><span class="avatar-body"></span><span class="scan-line"></span></div><div><p class="kicker">BODY-FIRST SHOPPING</p><h2>See the fit before you buy.</h2><p>Reusable avatar previews for product discovery.</p></div>${button('Get Started')}</section>`],
  ['Auth', `<section class="phone black-screen auth"><span class="back">‹</span><div><p class="kicker">SECURE SIGN IN</p><h2>Login to your account</h2><p>Authenticate before scanning or trying on.</p></div><label>Mobile number<div class="field">+1 555 018 2048</div></label>${button('Send Code')}<div class="divider"><span></span>OR<span></span></div>${button('Continue with Google', 'secondary-button')}${button('Continue with Apple', 'secondary-button')}</section>`],
  ['Home', `<section class="phone black-screen home">${header()}<div class="hero"><div><p class="kicker">NEW DROP</p><h2>Try fits built for your avatar.</h2><p>Browse curated pieces and preview them on your body profile.</p></div><span class="avatar-body hero-body"></span></div><h3>Recommended</h3><div class="product-grid">${products.map(productCard).join('')}</div></section>`],
  ['Body Scan', `<section class="phone black-screen scan">${header('BODY SCAN')}<div class="scan-preview tall"><span class="corner one"></span><span class="corner two"></span><span class="corner three"></span><span class="corner four"></span><span class="avatar-head"></span><span class="avatar-body"></span><span class="scan-line"></span></div><h2>Create a private measurement snapshot.</h2><p>Stand in frame with good lighting.</p>${button('Start Body Scan')}</section>`],
  ['Avatar', `<section class="phone black-screen avatar">${header('AVATAR')}<div class="avatar-stage"><span class="avatar-head"></span><span class="avatar-body"></span><span class="avatar-legs"></span></div><div class="measurements"><b>175<small>Height</small></b><b>34<small>Chest</small></b><b>28<small>Waist</small></b></div>${button('Start Virtual Try-On')}</section>`],
  ['Try-On', `<section class="phone black-screen tryon">${header('TRY-ON')}<div class="avatar-stage">${productArt('brown')}<span class="fit-badge">98%<small>Fit</small></span></div><h2>Brown Jacket</h2><p>Relaxed fit · Low return risk</p>${button('Add to Bag')}</section>`],
  ['Product Detail', `<section class="phone black-screen detail">${header('PRODUCT')}${productArt('brown')}<div class="title-row"><div><h2>Brown Jacket</h2><p>Outerwear Men’s</p></div><b>$120</b></div><p>Try-on ready garment rendered with native UI shapes.</p>${button('Virtual Try-On')}${button('Add to Wishlist', 'secondary-button')}</section>`],
  ['Profile', `<section class="phone black-screen profile">${header('PROFILE')}<div class="profile-card"><span class="profile-avatar">R</span><div><h2>Raritone Member</h2><p>member@raritone.app</p></div></div><div class="settings"><p>Measurement Snapshot <b>v1.0</b></p><p>Orders <b>›</b></p><p>Saved products <b>›</b></p><p>Privacy controls <b>›</b></p></div></section>`],
];

function render() {
  const board = screens.map(([title, markup]) => `<div class="screen-frame"><h2>${title}</h2>${markup}</div>`).join('');
  document.getElementById('root').innerHTML = `<main class="app-board"><header class="board-header"><p>Raritone Frontend</p><h1>Native UI rebuild reference board</h1><span>All screens are built from layout, text, and vector-like CSS shapes; no captured image components are displayed.</span></header><div class="screen-grid">${board}</div></main>`;
}

render();
