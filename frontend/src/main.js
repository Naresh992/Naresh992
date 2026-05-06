import { figmaScreens } from './figmaScreens.js';

const products = [
  ['Brown Jacket', 'brown'],
  ['Black Jacket', 'black'],
  ['Black Puff Jacket', 'puff'],
  ['Brownish Jacket', 'tan'],
];

function topBar(minimal = false, logo = 'Raritone') {
  return `<div class="top-bar">${minimal ? '<span class="back">←</span>' : `<strong class="brand">${logo}</strong>`}<div class="top-icons"><span>♡</span><span>⌂</span></div></div>`;
}

function bottomNav() {
  return '<nav class="bottom-nav"><span class="active">⌂</span><span>≛</span><span>☻</span><span>♙</span></nav>';
}

function primaryButton(label) {
  return `<button class="primary-button">${label}</button>`;
}

function productCard([name, tone]) {
  return `<article class="product-card"><span class="heart">♡</span><div class="product-art ${tone}"></div><button class="try-on">⌘ Try On</button><div class="product-meta"><div><strong>${name}</strong><small>Outwear Men’s</small></div><b>$ 120</b></div></article>`;
}

function socialButtons() {
  return '<div class="divider"><span></span>Or<span></span></div><button class="social google"><b>G</b> Login with Google</button><button class="social facebook"><b>f</b> Login with Facebook</button>';
}

const screens = [
  ['Onboarding', `<section class="phone onboarding"><div class="hero-triptych"><div class="hero-panel yellow">🛍️</div><div class="hero-panel beige">🧥</div><div class="hero-panel pink">👒</div></div><div class="glass-card"><h2>Curated for You</h2><p>Experience fashion like never before. Try on the latest collections virtually with our premium AR lens.</p><div class="dots"><b></b><i></i><i></i></div>${primaryButton('Get Started')}</div></section>`],
  ['Login', `<section class="phone auth-screen"><span class="back">←</span><div class="auth-content"><h1>Login to your account</h1><p>It’s great to see you again</p><label>Mobile Number</label><div class="field">+ 91&nbsp;&nbsp;999 - 000 - 1234</div>${primaryButton('Send Code')}${socialButtons()}<p class="join">Don’t have an account? <b>Join</b></p></div></section>`],
  ['OTP complete', `<section class="phone auth-screen otp-screen"><span class="back">←</span><div class="auth-content"><h1>Enter 4 Digit Code</h1><p>We have sent the code verification to<br />(+ 91 999 - 000 - 1234) <a>Change?</a></p><div class="otp-row"><div>1</div><div>4</div><div>2</div><div>0</div></div><p class="resend">Code not received? <a>Resend code</a></p>${primaryButton('Continue')}${socialButtons()}<p class="join">Don’t have an account? <b>Join</b></p></div></section>`],
  ['Setup Profile', `<section class="phone setup-screen"><span class="back">←</span><h1>Setup Profile</h1><div class="avatar-photo">👤<button>📷</button></div><a class="change-photo">Change Profile Photo</a><div class="profile-grid">${['Full Name','Username','Address','City','Zip','Height (CM)','Shoe Size (US)','Chest (IN)','Waist (IN)'].map((field) => `<label>${field}<input placeholder="${field === 'Full Name' ? 'Jane Doe' : field}" /></label>`).join('')}</div>${primaryButton('Complete Setup')}</section>`],
  ['Home Feed', `<section class="phone shop-screen">${topBar()}<div class="search-row"><span>⌕ Browse</span><button>≡</button></div><div class="collection-hero"><small>SUMMER 2026</small><h2>Golden Hour<br />Collection</h2><b>SHOP THE EDIT →</b></div><div class="promo">Limited Time <strong>Winter Sale -30% Off</strong></div><div class="categories"><span>All</span><span>Men</span><span>Women</span><span>Boy</span></div><div class="product-grid">${products.concat(products).map(productCard).join('')}</div>${bottomNav()}</section>`],
  ['Product Detail', `<section class="phone detail-screen">${topBar(true)}<div class="detail-image"><div class="jacket-large"></div><button class="try-on top">⌘ Try On</button></div><div class="thumbs"><span></span><span></span><span></span><span></span><span></span></div><div class="detail-info"><div><h3>Brown Jacket</h3><p>Outwear Men’s</p></div><div class="rating">4.0 ⭐⭐⭐⭐☆<strong>$ 120</strong></div></div><p class="label">Color</p><div class="swatches"><span></span><span></span><span></span></div><p class="label">Size <a>Size Guide</a></p><div class="sizes"><b>S</b><b>M</b><b>L</b><b class="disabled">XL</b></div>${primaryButton('🛍️ Add to Cart')}<h3>Description</h3><p class="description">Regular fit jacket made from faux suede fabric. Featuring a lapel collar and long sleeves with buttoned cuffs.</p>${bottomNav()}</section>`],
  ['Virtual Try-On', `<section class="phone tryon-sheet">${topBar(true)}<div class="scan-area"><div class="jacket-large"></div></div><div class="bottom-sheet"><i class="handle"></i><h2>Virtual Try-On</h2><p>Select a method to visualize this look</p><div class="sheet-option">📷<div><b>Live Camera</b><span>See it on you instantly</span></div>›</div><div class="sheet-option">🖼️<div><b>Upload Photo</b><span>Pick from your gallery</span></div>›</div><div class="sheet-option">🥽<div><b>Try VR Headset</b><span>Gear on your device</span></div>›</div><button class="cancel-button">Cancel</button></div>${bottomNav()}</section>`],
  ['Search Empty', `<section class="phone search-screen">${topBar(true)}<div class="big-search"><span>⌕</span> Browse</div><div class="section-row"><h2>Recent Searches</h2><a>Clear All</a></div><div class="center-empty"><div class="empty-icon">⌕</div><h2>No Results Found!</h2><p>Try a similar word or something<br />more general.</p></div>${bottomNav()}</section>`],
  ['Notifications', `<section class="phone notifications-screen"><span class="back">←</span><h1>Notifications</h1><div class="notification-tabs"><span class="active">Activity</span><span>Promotions</span></div><div class="notification-group"><h3>TODAY</h3><article class="notification-card"><span class="notice-icon">🧥</span><div><b>Order #2938 Shipped</b><p>Your AR-verified sneaker is on the way. Track your package now.</p><small>2h ago <a>Track Order</a></small></div><i>›</i></article></div><div class="notification-group"><h3>YESTERDAY</h3><article class="notification-card"><span class="notice-icon">✓</span><div><b>Order Confirmed</b><p>Thanks for shopping with us. We've received your order.</p><small>1d ago</small></div><i>›</i></article></div>${bottomNav()}</section>`],
  ['Shopping Bag', `<section class="phone bag-screen"><span class="back">←</span><h1>Shopping Bag</h1>${['Oversized Cotton Jacket','Oversized Cotton Shirt','Silk Pattern Scarf'].map((name, index) => `<article class="cart-row"><div class="cart-art">${index === 2 ? '◒' : '◨'}</div><div><h3>${name}</h3><p>${index === 2 ? 'One Size · Multi' : 'Size M · Blue'}</p><b>$${index === 1 ? '240' : index === 2 ? '45' : '120'}.00</b></div><span class="trash">♲</span><div class="qty">− ${index === 2 ? 2 : 1} +</div></article>`).join('')}<div class="checkout-card"><div class="promo-input">◇ Promo Code <button>Apply</button></div><p>Subtotal <b>$450.00</b></p><p>Shipping <b>$15.00</b></p><h2>Total <b>$465.00</b></h2>${primaryButton('Checkout →')}</div>${bottomNav()}</section>`],
  ['Checkout', `<section class="phone checkout-screen"><span class="back">←</span><h1>Check Out</h1><div class="section-row"><h2>Select Address</h2><a>Manage</a></div><div class="address-card selected"><span class="radio">●</span><div><b class="tag">HOME</b><h3>Jane Doe</h3><p>123 Fashion Ave, Apt 4B<br />New York, NY 10001<br /><br />(555) 123-4567</p></div><i>✎</i></div><div class="address-card"><span class="radio">○</span><div><b class="tag">WORK</b><h3>Jane Doe</h3><p>456 Studio Loft<br />Brooklyn, NY 11211</p></div></div><button class="add-address">⊕ Add New Address</button>${primaryButton('Continue to payment →')}${bottomNav()}</section>`],
  ['Filters', `<section class="phone filters-screen"><span class="back">←</span><h1>Filters</h1>${['Category','Material','Price Range','Brands'].map((section) => `<div class="filter-section"><div class="filter-heading"><b>${section}</b>${section === 'Category' ? '<small>2 Selected</small>' : ''}</div><div class="chip-grid"><button class="selected">Dresses</button><button>Outwear</button><button class="selected">Bags</button><button>Shoes</button></div></div>`).join('')}<div class="filter-section"><b>Color</b><div class="color-row"><span></span><span></span><span></span><span></span><span></span><span></span></div></div><div class="filter-section"><b>Size</b><div class="size-row"><span>XS</span><span>S</span><span>M</span><span>L</span><span class="selected-outline">XL</span></div></div>${primaryButton('Reset Filter’s →')}</section>`],
  ['AI Chat', `<section class="phone chat-screen"><span class="back">←</span><h1>Try On AI Chat Assistant</h1><div class="chat-thread"><div class="bot-row"><span class="avatar-dot"></span><i></i></div><div class="user-bubble"></div><div class="bot-row"><span class="avatar-dot"></span><i></i></div><div class="user-bubble"></div></div><div class="quick-actions"><button>▣ Track Order</button><button>▤ Returns</button><button>▥ Size Guide</button></div><div class="message-box"><span>☻</span><p>Type a message</p><b>⌕</b><b>▷</b></div></section>`],
];

function render() {
  const checklist = figmaScreens.map((screen) => `<span><b>${screen.flow}</b>${screen.title}</span>`).join('');
  const board = screens.map(([title, markup]) => `<div class="screen-frame"><h2>${title}</h2>${markup}</div>`).join('');
  document.getElementById('root').innerHTML = `<main class="figma-board"><header class="board-header"><p>Raritone Frontend</p><h1>Fully working Figma-inspired frontend</h1><div class="screenshot-checklist">${checklist}</div></header><div class="screen-grid">${board}</div></main>`;
}

render();
