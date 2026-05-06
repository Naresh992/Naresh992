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

function SearchScreen({ empty = false }) {
  const terms = ['Jeans', 'Casual clothes', 'Hoodie', 'Nike shoes black', 'V-neck tshirt', 'Winter clothes'];
  return (
    <section className="phone search-screen">
      <TopBar minimal />
      <div className="big-search"><span>⌕</span> Browse</div>
      <div className="section-row"><h2>Recent Searches</h2><a>Clear All</a></div>
      {empty ? (
        <div className="center-empty"><div className="empty-icon">⌕</div><h2>No Results Found!</h2><p>Try a similar word or something<br />more general.</p></div>
      ) : (
        <div className="recent-list">{terms.map((term) => <div key={term}>{term}</div>)}</div>
      )}
      <BottomNav />
    </section>
  );
}

function NotificationsScreen({ mode = 'empty' }) {
  const activityItems = [
    ['🧥', 'Order #2938 Shipped', 'Your AR-verified sneaker is on the way. Track your package now.', '2h ago', 'Track Order'],
    ['✓', 'Order Confirmed', "Thanks for shopping with us. We've received your order for the Limited Edition Jacket.", '1d ago'],
    ['▧', 'Price Drop Alert', 'An item in your wishlist is now on sale.', '6d ago'],
  ];
  const promoItems = [
    ['%', 'Flash Sale Alert', 'Get 20% off on all items you tried on virtually. Limited time offer.', '5h ago'],
    ['⌘', 'Virtual Try-On Updated', 'New AR features are available for sunglasses. Try them on now!', '5d ago'],
  ];

  if (mode === 'empty') {
    return (
      <section className="phone notification-empty">
        <TopBar minimal />
        <div className="center-empty notification-copy"><div className="empty-icon">♢</div><h2>You haven’t gotten any<br />notifications yet!</h2><p>We’ll alert you when something<br />cool happens.</p></div>
        <BottomNav />
      </section>
    );
  }

  const isPromo = mode === 'promotions';
  const groups = isPromo
    ? [['TODAY', [promoItems[0]]], ['LAST WEEK', [promoItems[1]]]]
    : [['TODAY', [activityItems[0]]], ['YESTERDAY', [activityItems[1]]], ['LAST WEEK', [activityItems[2]]]];

  return (
    <section className="phone notifications-screen">
      <span className="back">←</span>
      <h1>Notifications</h1>
      <div className="notification-tabs"><span className={!isPromo ? 'active' : ''}>Activity</span><span className={isPromo ? 'active' : ''}>Promotions</span></div>
      {groups.map(([label, items]) => (
        <div className="notification-group" key={label}>
          <h3>{label}</h3>
          {items.map(([icon, title, body, time, action]) => <article className="notification-card" key={title}><span className="notice-icon">{icon}</span><div><b>{title}</b><p>{body}</p><small>{time} {action && <a>{action}</a>}</small></div><i>›</i></article>)}
        </div>
      ))}
      <p className="caught-up">You're all caught up!</p>
      <BottomNav />
    </section>
  );
}

function BagScreen() {
  const cart = [
    ['◨', 'Oversized Cotton Jacket', 'Size M · Blue', '$120.00', '1'],
    ['◪', 'Oversized Cotton Shirt', 'Size 10 · Neon Green', '$240.00', '1'],
    ['◒', 'Silk Pattern Scarf', 'One Size · Multi', '$45.00', '2'],
  ];
  return (
    <section className="phone bag-screen">
      <span className="back">←</span>
      <h1>Shopping Bag</h1>
      {cart.map(([icon, name, meta, price, qty]) => <article className="cart-row" key={name}><div className="cart-art">{icon}</div><div><h3>{name}</h3><p>{meta}</p><b>{price}</b></div><span className="trash">♲</span><div className="qty">− {qty} +</div></article>)}
      <h3>You might also like</h3>
      <div className="mini-products"><div><div className="mini-art">▧</div><b>Cream Shirt</b><span>$35.00</span></div><div><div className="mini-art brown">▤</div><b>Brown Shirt</b><span>$35.00</span></div></div>
      <div className="checkout-card"><div className="promo-input">◇ Promo Code <button>Apply</button></div><p>Subtotal <b>$450.00</b></p><p>Shipping <b>$15.00</b></p><h2>Total <b>$465.00</b></h2><PrimaryButton>Checkout →</PrimaryButton></div>
      <BottomNav />
    </section>
  );
}

function CheckoutScreen() {
  return (
    <section className="phone checkout-screen">
      <span className="back">←</span>
      <h1>Check Out</h1>
      <div className="section-row"><h2>Select Address</h2><a>Manage</a></div>
      <div className="address-card selected"><span className="radio">●</span><div><b className="tag">HOME</b><h3>Jane Doe</h3><p>123 Fashion Ave, Apt 4B<br />New York, NY 10001<br /><br />(555) 123-4567</p></div><i>✎</i></div>
      <div className="address-card"><span className="radio">○</span><div><b className="tag">WORK</b><h3>Jane Doe</h3><p>456 Studio Loft<br />Brooklyn, NY 11211<br /><br />(555) 987-6543</p></div></div>
      <button className="add-address">⊕ Add New Address</button>
      <PrimaryButton>Continue to payment →</PrimaryButton>
      <BottomNav />
    </section>
  );
}

function FiltersScreen() {
  const chips = {
    Category: ['Dresses', 'Outwear', 'Bags', 'Shoes', 'Eyewear', 'Accessories'],
    Material: ['⚗ Synthetic', '♨ Bio-Cotton', '♻ Recycled Poly', '▣ Smart Fabric'],
    'Price Range': ['Under $500', '$500-$1000', '$1000-$2000', 'Over $2000'],
    Brands: ['Gucci', 'Zara', 'Nike', 'Prada'],
  };
  return (
    <section className="phone filters-screen">
      <span className="back">←</span><h1>Filters</h1>
      {Object.entries(chips).map(([title, items]) => <div className="filter-section" key={title}><div className="filter-heading"><b>{title}</b>{title === 'Category' && <small>2 Selected</small>}</div><div className="chip-grid">{items.map((item, index) => <button className={index === 0 || item.includes('Recycled') || item.includes('$1000') || item === 'Nike' ? 'selected' : ''} key={item}>{item}</button>)}</div></div>)}
      <div className="filter-section"><b>Color</b><div className="color-row">{['#ff5862', '#ffc928', '#43c329', '#f51f16', '#000', '#2461e8', '#2461e8', '#fff'].map((color, index) => <span style={{ background: color }} key={`${color}-${index}`} />)}</div></div>
      <div className="filter-section"><b>Size</b><div className="size-row">{['XS','S','M','L','XL','XXL','36','38','40','42','44'].map((size) => <span className={size === 'XL' ? 'selected-outline' : ''} key={size}>{size}</span>)}</div></div>
      <div className="filter-section"><b>Sort by</b><ul className="sort-list"><li>What’s New</li><li>Customer Rating</li><li>Price Low to High</li><li>Price High to Low</li><li>Popularity</li><li>Discount</li></ul></div>
      <PrimaryButton>Reset Filter’s →</PrimaryButton>
    </section>
  );
}

function ChatAssistantScreen() {
  return (
    <section className="phone chat-screen">
      <span className="back">←</span><h1>Try On AI Chat Assistant</h1>
      <div className="chat-thread"><div className="bot-row"><span className="avatar-dot" /><i /></div><div className="user-bubble" /><div className="bot-row"><span className="avatar-dot" /><i /></div><div className="user-bubble" /></div>
      <div className="quick-actions"><button>▣ Track Order</button><button>▤ Returns</button><button>▥ Size Guide</button></div>
      <div className="message-box"><span>☻</span><p>Type a message</p><b>⌕</b><b>▷</b></div>
    </section>
  );
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
    ['Search empty', <SearchScreen empty />],
    ['Recent searches', <SearchScreen />],
    ['Notifications empty', <NotificationsScreen />],
    ['Notifications activity', <NotificationsScreen mode="activity" />],
    ['Notifications promos', <NotificationsScreen mode="promotions" />],
    ['Shopping bag', <BagScreen />],
    ['Checkout address', <CheckoutScreen />],
    ['Filters', <FiltersScreen />],
    ['AI chat assistant', <ChatAssistantScreen />],
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
