import React from 'react';

const products = [
  { name: 'Brown Jacket', tone: 'brown' },
  { name: 'Black Jacket', tone: 'black' },
  { name: 'Black Puff Jacket', tone: 'puff' },
  { name: 'Brownish Jacket', tone: 'tan' },
];

const wardrobe = ['◧', '◨', '◩', '◪', '▣', '▤', '▥', '▦', '▧'];

function TopBar({ logo = 'Raritone', minimal = false }) {
  return (
    <div className="top-bar">
      {minimal ? <span className="back">←</span> : <strong className="brand">{logo}</strong>}
      <div className="top-icons">
        <span>♡</span>
        <span>⌂</span>
      </div>
    </div>
  );
}

function PrimaryButton({ children }) {
  return <button className="primary-button">{children}</button>;
}

function SocialButtons() {
  return (
    <>
      <div className="divider"><span />Or<span /></div>
      <button className="social google"><b>G</b> Login with Google</button>
      <button className="social facebook"><b>f</b> Login with Facebook</button>
    </>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <span className="heart">♡</span>
      <div className={`product-art ${product.tone}`} />
      <button className="try-on">⌘ Try On</button>
      <div className="product-meta">
        <div><strong>{product.name}</strong><small>Outwear Men’s</small></div>
        <b>$ 120</b>
      </div>
    </article>
  );
}

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <span className="active">⌂</span><span>≛</span><span>☻</span><span>♙</span>
    </nav>
  );
}

function OnboardingScreen() {
  return (
    <section className="phone onboarding">
      <div className="hero-triptych">
        <div className="hero-panel yellow"><span>🛍️</span></div>
        <div className="hero-panel beige"><span>🧥</span></div>
        <div className="hero-panel pink"><span>👒</span></div>
      </div>
      <div className="glass-card intro-card">
        <h2>Curated for You</h2>
        <p>Experience fashion like never before. Try on the latest collections virtually with our premium AR lens.</p>
        <div className="dots"><b /><i /><i /></div>
        <PrimaryButton>Get Started</PrimaryButton>
      </div>
    </section>
  );
}

function LoginScreen() {
  return (
    <section className="phone auth-screen">
      <span className="back">←</span>
      <div className="auth-content">
        <h1>Login to your account</h1>
        <p>It’s great to see you again</p>
        <label>Mobile Number</label>
        <div className="field">+ 91&nbsp;&nbsp;999 - 000 - 1234</div>
        <PrimaryButton>Send Code</PrimaryButton>
        <SocialButtons />
        <p className="join">Don’t have an account? <b>Join</b></p>
      </div>
    </section>
  );
}

function OtpScreen({ complete = false }) {
  return (
    <section className="phone auth-screen otp-screen">
      <span className="back">←</span>
      <div className="auth-content">
        <h1>Enter 4 Digit Code</h1>
        <p>We have sent the code verification to<br />(+ 91 999 - 000 - 1234) <a>Change?</a></p>
        <div className="otp-row">{['1', '4', complete ? '2' : '', complete ? '0' : ''].map((digit, index) => <div className="otp-box" key={index}>{digit}</div>)}</div>
        <p className="resend">Code not received? <a>Resend code</a></p>
        <PrimaryButton>Continue</PrimaryButton>
        <SocialButtons />
        <p className="join">Don’t have an account? <b>Join</b></p>
      </div>
    </section>
  );
}

function SetupProfileScreen() {
  const fields = ['Full Name', 'Username', 'Address', 'City', 'Zip', 'Height (CM)', 'Shoe Size (US)', 'Chest (IN)', 'Waist (IN)'];
  return (
    <section className="phone setup-screen">
      <span className="back">←</span>
      <h1>Setup Profile</h1>
      <div className="avatar-photo">👤<button>📷</button></div>
      <a className="change-photo">Change Profile Photo</a>
      <div className="profile-grid">
        {fields.map((field) => <label key={field}>{field}<input placeholder={field === 'Full Name' ? 'Jane Doe' : field === 'Zip' ? '101010' : field.includes('Height') ? '175' : field.includes('Shoe') ? '8.5' : field.includes('Chest') ? '34' : field.includes('Waist') ? '28' : field} /></label>)}
      </div>
      <PrimaryButton>Complete Setup</PrimaryButton>
    </section>
  );
}

function HomeScreen() {
  return (
    <section className="phone shop-screen">
      <TopBar />
      <div className="search-row"><span>⌕ Browse</span><button>≡</button></div>
      <div className="collection-hero"><small>SUMMER 2026</small><h2>Golden Hour<br />Collection</h2><b>SHOP THE EDIT →</b></div>
      <div className="promo">Limited Time <strong>Winter Sale -30% Off</strong></div>
      <div className="categories"><span>All</span><span>Men</span><span>Women</span><span>Boy</span></div>
      <div className="product-grid">{products.concat(products).map((product, index) => <ProductCard product={product} key={`${product.name}-${index}`} />)}</div>
      <div className="promo dark">Limited Time <strong>Sale -30% Off</strong></div>
      <BottomNav />
    </section>
  );
}

function ProductDetailScreen({ ar = false }) {
  return (
    <section className="phone detail-screen">
      <TopBar minimal />
      <div className={`detail-image ${ar ? 'room' : ''}`}>
        <div className="jacket-large" />
        {ar && <div className="model-overlay">🧍</div>}
        <button className="try-on top">⌘ Try On</button>
      </div>
      <div className="thumbs"><span /><span /><span /><span /><span /></div>
      <div className="detail-info"><div><h3>Brown Jacket</h3><p>Outwear Men’s</p></div><div className="rating">4.0 ⭐⭐⭐⭐☆<strong>$ 120</strong></div></div>
      <p className="label">Color</p><div className="swatches"><span /><span /><span /></div>
      <p className="label">Size <a>Size Guide</a></p><div className="sizes"><b>S</b><b>M</b><b>L</b><b className="disabled">XL</b></div>
      <PrimaryButton>🛍️ Add to Cart</PrimaryButton>
      {!ar && <><h3>Description</h3><p className="description">Regular fit jacket made from faux suede fabric. Featuring a lapel collar and long sleeves with buttoned cuffs.</p><h3>Similar Outfit</h3><div className="product-grid compact">{products.slice(2, 4).map((product) => <ProductCard product={product} key={product.name} />)}</div></>}
      <BottomNav />
    </section>
  );
}

function TryOnSheet({ avatar = false, wardrobeMode = false }) {
  return (
    <section className={`phone tryon-sheet ${avatar ? 'avatar-mode' : ''}`}>
      <TopBar minimal />
      <div className="scan-area"><div className="grid-lines" />{avatar ? <span>🧍</span> : <div className="jacket-large" />}</div>
      <div className="bottom-sheet">
        <i className="handle" />
        <h2>{wardrobeMode ? 'Add to wardrobe' : avatar ? 'Create your 3D Figure' : 'Virtual Try-On'}</h2>
        <p>{wardrobeMode ? 'Select a method to update your wardrobe' : avatar ? 'Get the perfect fit by creating your digital twin. Choose how you want to start.' : 'Select a method to visualize this look'}</p>
        <div className="sheet-option">📷 <div><b>{avatar ? 'Scan Body' : 'Live Camera'}</b><span>See it on you instantly</span></div>›</div>
        <div className="sheet-option">🖼️ <div><b>Upload Photo</b><span>Pick from your gallery</span></div>›</div>
        {!avatar && !wardrobeMode && <div className="sheet-option">🥽 <div><b>Try VR Headset</b><span>Gear on your device</span></div>›</div>}
        <button className="cancel-button">Cancel</button>
      </div>
      <BottomNav />
    </section>
  );
}

function VrScreen() {
  return <section className="phone vr-screen"><TopBar minimal /><div className="vr-lenses"><span>◖🧍◗</span><span>◖🧍◗</span></div><div className="vr-copy">🥽<h1>Put on your<br />headset</h1></div><PrimaryButton>🥽 Try VR Headset</PrimaryButton><BottomNav /></section>;
}

function ProfileDashboard() {
  const items = ['Order History', 'My Wardrobe', 'Wishlist', 'Payment Methods', 'Settings', 'Privacy Policy', 'Help Center'];
  return <section className="phone profile-dashboard"><TopBar logo="TRYON." /><div className="profile-hero">🧍</div><div className="settings-panel"><div className="tabs"><span>Fashion</span><span>Avatar</span><span>Settings</span></div><div className="stats"><b>34</b><b>28</b><b>8</b></div>{items.map((item) => <div className="menu-row" key={item}>{item}<span>›</span></div>)}</div><PrimaryButton>Sign Out</PrimaryButton><BottomNav /></section>;
}

function EmptyState({ type = 'wardrobe' }) {
  const isWishlist = type === 'wishlist';
  return <section className="phone empty-state"><TopBar minimal /><div className="empty-copy"><div className="empty-icon">{isWishlist ? '♡' : '▥'}</div><h2>No {isWishlist ? 'Wishlist' : 'Wardrobe'} Items!</h2><p>You don’t have any items in {isWishlist ? 'wishlist' : 'wardrobe'}.</p><PrimaryButton>Add Items</PrimaryButton></div><BottomNav /></section>;
}

function WishlistScreen() {
  return <section className="phone wishlist-screen"><TopBar minimal /><h2>♡ Wishlist <span>›</span></h2><div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.name} />)}</div><PrimaryButton>Continue Shopping</PrimaryButton><BottomNav /></section>;
}

function AvatarWardrobeScreen() {
  return <section className="phone avatar-wardrobe"><TopBar minimal /><div className="profile-hero large">🧍</div><div className="wardrobe-panel"><div className="tabs"><span>Fashion</span><span>Avatar</span><span>Settings</span></div><div className="sub-icons"><span>👕</span><span>👖</span><span>🧢</span><span>👗</span><span>👜</span></div><div className="wardrobe-grid">{wardrobe.map((item, index) => <div key={index}>{item}</div>)}</div></div><BottomNav /></section>;
}

function AddProfileAvatar() {
  return <section className="phone add-profile"><TopBar minimal /><div className="profile-hero full">🧍</div><PrimaryButton>Add to Profile</PrimaryButton><BottomNav /></section>;
}

export function App() {
  const screens = [
    ['Onboarding', <OnboardingScreen />],
    ['Login', <LoginScreen />],
    ['OTP partial', <OtpScreen />],
    ['OTP complete', <OtpScreen complete />],
    ['Profile setup', <SetupProfileScreen />],
    ['Home feed', <HomeScreen />],
    ['Avatar wardrobe', <AvatarWardrobeScreen />],
    ['Product detail', <ProductDetailScreen />],
    ['Try-on sheet', <TryOnSheet />],
    ['AR product', <ProductDetailScreen ar />],
    ['VR headset', <VrScreen />],
    ['Create 3D figure', <TryOnSheet avatar />],
    ['Add profile avatar', <AddProfileAvatar />],
    ['Profile dashboard', <ProfileDashboard />],
    ['Empty wardrobe', <EmptyState />],
    ['Add wardrobe sheet', <TryOnSheet wardrobeMode />],
    ['Wishlist', <WishlistScreen />],
    ['Empty wishlist', <EmptyState type="wishlist" />],
  ];

  return (
    <main className="figma-board">
      <header className="board-header">
        <p>Raritone Frontend</p>
        <h1>Figma-inspired shopping + virtual try-on screens</h1>
      </header>
      <div className="screen-grid">
        {screens.map(([title, screen]) => <div className="screen-frame" key={title}><h2>{title}</h2>{screen}</div>)}
      </div>
    </main>
  );
}
