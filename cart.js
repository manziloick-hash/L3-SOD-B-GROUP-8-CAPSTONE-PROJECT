// ============================================
//  PÂTISSERIE ROYALE — cart.js
//  Shopping cart / order sidebar
// ============================================

(function () {
  let cart = JSON.parse(localStorage.getItem('pr_cart') || '[]');

  const cartBtn      = document.getElementById('cartBtn');
  const cartSidebar  = document.getElementById('cartSidebar');
  const cartOverlay  = document.getElementById('cartOverlay');
  const cartClose    = document.getElementById('cartClose');
  const cartItemsEl  = document.getElementById('cartItems');
  const cartTotalEl  = document.getElementById('cartTotal');
  const cartCountEl  = document.getElementById('cartCount');

  // ─── OPEN / CLOSE ───
  function openCart()  { cartSidebar?.classList.add('active'); cartOverlay?.classList.add('active'); }
  function closeCart() { cartSidebar?.classList.remove('active'); cartOverlay?.classList.remove('active'); }

  cartBtn?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // ─── ADD TO CART (exposed globally for main.js) ───
  window.addToCart = function (product) {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    saveCart();
    renderCart();
    openCart();
    animateBadge();
  };

  // ─── REMOVE ───
  function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
  }

  // ─── SAVE ───
  function saveCart() {
    localStorage.setItem('pr_cart', JSON.stringify(cart));
  }

  // ─── RENDER ───
  function renderCart() {
    if (!cartItemsEl) return;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p style="color:var(--text-muted);font-size:14px;text-align:center;padding:32px 0">Your order is empty</p>';
    } else {
      cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"></div>
          <div class="cart-item-info">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">${(item.price * item.qty).toLocaleString()} RWF ${item.qty > 1 ? `<span style="color:var(--text-light)">×${item.qty}</span>` : ''}</p>
          </div>
          <button class="cart-item-remove" data-id="${item.id}">✕</button>
        </div>
      `).join('');

      cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
      });
    }

    // Total
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    if (cartTotalEl) cartTotalEl.textContent = total.toLocaleString() + ' RWF';

    // Badge count
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    if (cartCountEl) cartCountEl.textContent = count;
  }

  // ─── BADGE ANIMATION ───
  function animateBadge() {
    cartCountEl?.classList.remove('pulse');
    void cartCountEl?.offsetWidth; // reflow
    cartCountEl?.classList.add('pulse');
  }

  // ─── INIT ───
  renderCart();
})();
