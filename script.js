
const cart = [];
const rupiah = angka =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);

// ===== TAMBAH PRODUK KE KERANJANG =====
function addToCart(name, price) {
    const product = cart.find(item => item.name === name);

    if (product) {
        product.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    showMessage(name + " berhasil ditambahkan ke keranjang! ♡");
}

// ===== UPDATE KERANJANG =====
function updateCart() {
    const count = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = count;
    }

    const cartTotal = document.getElementById("cart-total");

    if (cartTotal) {
        cartTotal.textContent = rupiah(total);
    }

    const cartItems = document.getElementById("cart-items");

    if (cartItems) {
        cartItems.replaceChildren();

        if (cart.length === 0) {
            cartItems.textContent = "Keranjang masih kosong.";
        }

        cart.forEach(item => {
            const row = document.createElement("p");
            row.textContent =
                `${item.name} × ${item.quantity} — ` +
                rupiah(item.price * item.quantity);

            cartItems.appendChild(row);
        });
    }
}

// ===== NOTIFIKASI =====
let messageTimer;

function showMessage(message) {
    const box = document.getElementById("cart-message");

    if (!box) {
        alert(message);
        return;
    }

    box.textContent = message;
    box.style.display = "block";

    clearTimeout(messageTimer);

    messageTimer = setTimeout(() => {
        box.style.display = "none";
    }, 2500);
}

// ===== PENCARIAN PRODUK =====
const searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll(".product-card");
        let found = 0;

        cards.forEach(card => {
            const name = (
                card.dataset.name ||
                card.querySelector("h3")?.textContent ||
                ""
            ).toLowerCase();

            const match = name.includes(keyword);

            card.style.display = match ? "" : "none";

            if (match) found++;
        });

        const emptyMessage =
            document.getElementById("empty-message");

        if (emptyMessage) {
            emptyMessage.style.display =
                found === 0 ? "block" : "none";
        }
    });
}

// ===== TAHUN OTOMATIS DI FOOTER =====
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===== INISIALISASI =====
updateCart();
