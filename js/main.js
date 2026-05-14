// ============================================
//  PÂTISSERIE ROYALE — main.js
//  Core interactions & product data
// ============================================

// ─── PRODUCT DATA ───
const products = [
  // PASTRIES
  { id: 1, name: 'Butter Croissant',      category: 'pastries', price: 2500, tag: 'Bestseller',   desc: '72-hour laminated dough, pure French butter, perfectly flaky', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop' },
  { id: 2, name: 'Pain au Chocolat',      category: 'pastries', price: 2800, tag: 'Morning pick', desc: 'Double dark-chocolate batons in buttery puff pastry', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop' },
  { id: 3, name: 'Mille-feuille',         category: 'pastries', price: 3200, tag: '',              desc: 'Layers of crisp puff pastry with vanilla diplomat cream', img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&auto=format&fit=crop' },
  { id: 4, name: 'Seasonal Fruit Tart',   category: 'pastries', price: 3500, tag: 'Seasonal',     desc: 'Breton shortcrust, pastry cream, local tropical fruits', img: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&auto=format&fit=crop' },
  // CAKES
  { id: 5, name: 'Signature Layer Cake',  category: 'cakes',    price: 28000, tag: 'Custom order', desc: 'Vanilla sponge, fresh cream, customisable decoration', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&auto=format&fit=crop' },
  { id: 6, name: 'Dark Choc Fondant',     category: 'cakes',    price: 4200,  tag: 'Bestseller',   desc: 'Molten centre, served warm with crème anglaise', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop' },
  { id: 7, name: 'Passion Fruit Cheesecake', category: 'cakes', price: 3800,  tag: '',             desc: 'New York-style base, silky Rwandan passion fruit curd', img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&auto=format&fit=crop' },
  { id: 8, name: 'Opéra Cake',            category: 'cakes',    price: 4500,  tag: '',             desc: 'Coffee buttercream and ganache on almond jaconde sponge', img: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=400&auto=format&fit=crop' },
  // BREAD
  { id: 9,  name: 'Artisan Sourdough',    category: 'bread',    price: 3500,  tag: 'Daily baked', desc: 'Long-fermented sourdough with crispy crust and open crumb', img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&auto=format&fit=crop' },
  { id: 10, name: 'Baguette Tradition',   category: 'bread',    price: 1800,  tag: '',            desc: 'Classic French baguette, baked twice daily', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop' },
  // DRINKS
  { id: 11, name: 'Flat White',           category: 'drinks',   price: 2200, tag: 'Local bean',   desc: 'Single-origin Rwandan arabica, silky micro-foam', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop' },
  { id: 12, name: 'Matcha Latte',         category: 'drinks',   price: 2800, tag: '',             desc: 'Ceremonial grade matcha with oat milk or whole milk', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop' },
  { id: 13, name: 'Fresh-pressed Juice',  category: 'drinks',   price: 2000, tag: 'Daily fresh',  desc: 'Seasonal local fruits — mango, passion, avocado', img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&auto=format&fit=crop' },
  // SAVORY
  { id: 14, name: 'Quiche Lorraine',      category: 'savory',   price: 4800, tag: '',             desc: 'Classic French filling, buttery shortcrust, house salad', img: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&auto=format&fit=crop' },
  { id: 15, name: 'Croque Monsieur',      category: 'savory',   price: 5200, tag: 'Brunch fave',  desc: 'House sourdough, béchamel, Gouda, smoked ham', img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&auto=format&fit=crop' },
  { id: 16, name: 'Avocado Toast',        category: 'savory',   price: 4500, tag: 'Local love',   desc: 'Rwandan avocado, sourdough, poached egg, chili flakes', img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&auto=format&fit=crop' },
];

// ─── RENDER PRODUCT CARD ───
function createProductCard(p) {
  return `
    <div class="product-card fade-up" data-id="${p.id}">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-body">
        <p class="product-name">${p.name}</p>
        <p class="product-desc">${p.desc}</p>
        <div class="product-foot">
          <span class="product-price">${p.price.toLocaleString()} RWF</span>
          ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
        </div>
        <button class="add-to-cart" style="margin-top:10px;width:100%" data-id="${p.id}">Add to Order</button>
      </div>
    </div>`;
}

// ─── FEATURED GRID (index.html) ───
const featuredGrid = document.getElementById('featuredGrid');
if (featuredGrid) {
  const featured = products.filter(p => p.tag === 'Bestseller' || p.tag === 'Morning pick' || p.tag === 'Local love' || p.tag === 'Local bean');
  featuredGrid.innerHTML = featured.slice(0, 4).map(createProductCard).join('');
}

// ─── PRODUCTS GRID (products.html) ───
const productsGrid = document.getElementById('productsGrid');
if (productsGrid) {
  let current = 'all';
  const render = (filter) => {
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    productsGrid.innerHTML = filtered.map(createProductCard).join('');
    initScrollReveal();
    bindAddToCart();
  };
  render('all');
  document.querySelectorAll('#menuTabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#menuTabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      current = btn.dataset.filter;
      render(current);
    });
  });
}

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// ─── SCROLL REVEAL ───
function initScrollReveal() {
  const els = document.querySelectorAll('.fade-up, .fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initScrollReveal);

// ─── ADD TO CART BINDING ───
function bindAddToCart() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) window.addToCart && window.addToCart(product);
    });
  });
}
document.addEventListener('DOMContentLoaded', bindAddToCart);

// ─── NEWSLETTER FORM ───
const nlForm = document.getElementById('nlForm');
if (nlForm) {
  nlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = nlForm.querySelector('input');
    const btn   = nlForm.querySelector('button');
    btn.textContent = '✅ Subscribed!';
    btn.style.background = '#15803d';
    input.value = '';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
  });
}
