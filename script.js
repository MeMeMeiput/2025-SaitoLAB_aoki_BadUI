//整理順：データ定義 → 状態管理 → 初期化 → カテゴリー制御 → 
// メニュー描画 → カート操作 → 履歴・会計アクション → イベント登録
// ==========================================
// 1. データ定義
// ==========================================

const menuData = [
    // --- 期間限定スイーツ (1-99) ---
    { id: 1, mainCategory: "期間限定スイーツ", category: "今月のイチオシ！", name: "贅沢イチゴのケーキ", price: 800, image: "images/贅沢イチゴのケーキ.png", options: [] },
    { id: 2, mainCategory: "期間限定スイーツ", category: "今月のイチオシ！", name: "かぼちゃケーキ", price: 700, image: "images/かぼちゃケーキ.png", options: [] },
    // --- ドリンク (100-199) ---
    { id: 111, mainCategory: "ドリンク", category: "アイスコーヒー", name: "ブレンドコーヒー", price: 550, image: "images/ブレンドコーヒー.png", options: [{name: "ガムシロップ", price: 0}, {name: "ミルク", price: 0}] },
    { id: 112, mainCategory: "ドリンク", category: "アイスコーヒー", name: "アイスカフェオレ", price: 650, image: "images/カフェオレ.png", options: [{name: "ガムシロップ", price: 0}] },
    { id: 121, mainCategory: "ドリンク", category: "ホットコーヒー", name: "ブレンドコーヒー", price: 500, image: "images/ブレンドコーヒー.png", options: [{name: "砂糖", price: 0}, {name: "ミルク", price: 0}, {name: "ホイップ追加", price: 100}] },
    { id: 122, mainCategory: "ドリンク", category: "ホットコーヒー", name: "アメリカーノ", price: 600, image: "images/アメリカーノ.png", options: [{name: "濃いめ", price: 0}, {name: "薄め", price: 0}] },
    { id: 131, mainCategory: "ドリンク", category: "紅茶", name: "ミルクティー", price: 500, image: "images/ミルクティー.png", options: [{name: "砂糖", price: 0}, {name: "レモン", price: 0}] },
    { id: 132, mainCategory: "ドリンク", category: "紅茶", name: "ダージリン", price: 500, image: "images/ダージリン.png", options: [{name: "砂糖", price: 0}, {name: "レモン", price: 0}] },
    { id: 141, mainCategory: "ドリンク", category: "ソフトドリンク", name: "オレンジジュース", price: 400, image: "images/オレンジジュース.png", options: [{name: "氷なし", price: 0}] },
    { id: 142, mainCategory: "ドリンク", category: "ソフトドリンク", name: "コーラ", price: 400, image: "images/コーラ.png", options: [{name: "氷なし", price: 0}] },
    { id: 151, mainCategory: "ドリンク", category: "お子様用ドリンク", name: "アップルジュース", price: 300, image: "images/オレンジジュース.png", options: [{name: "氷なし", price: 0}] },
    { id: 152, mainCategory: "ドリンク", category: "お子様用ドリンク", name: "ぶどうジュース", price: 300, image: "images/オレンジジュース.png", options: [{name: "氷なし", price: 0}] },
    // --- 軽食 (200-299) ---
    { id: 211, mainCategory: "軽食", category: "サンドイッチ", name: "BLTサンド", price: 700, image: "images/BLTサンド.png", options: [] },
    { id: 212, mainCategory: "軽食", category: "サンドイッチ", name: "たまごサンド", price: 600, image: "images/たまごサンド.png", options: [] },
    { id: 213, mainCategory: "軽食", category: "サンドイッチ", name: "ハムチーズサンド", price: 650, image: "images/ハムチーズサンド.png", options: [] },
    { id: 221, mainCategory: "軽食", category: "トースト・パン", name: "ピザトースト", price: 650, image: "images/ピザトースト.png", options: [] },
    { id: 222, mainCategory: "軽食", category: "トースト・パン", name: "トースト", price: 450, image: "images/トースト.png", options: [] },
    { id: 223, mainCategory: "軽食", category: "トースト・パン", name: "クロワッサン", price: 400, image: "images/クロワッサン.png", options: [] },
    // --- デザート (300-399) ---
    { id: 311, mainCategory: "デザート", category: "ケーキ", name: "チーズケーキ", price: 600, image: "images/チーズケーキ.png", options: [] },
    { id: 312, mainCategory: "デザート", category: "ケーキ", name: "贅沢イチゴのケーキ", price: 800, image: "images/贅沢イチゴのケーキ.png", options: [] },
    { id: 313, mainCategory: "デザート", category: "ケーキ", name: "かぼちゃケーキ", price: 700, image: "images/かぼちゃケーキ.png", options: [] },
    { id: 321, mainCategory: "デザート", category: "パフェ", name: "チョコパフェ", price: 850, image: "images/チョコパフェ.png", options: [] },
    { id: 322, mainCategory: "デザート", category: "パフェ", name: "抹茶パフェ", price: 850, image: "images/抹茶パフェ.png", options: [] },
    // --- モーニング (400-499) ---
    { id: 401, mainCategory: "モーニング", category: "モーニング", name: "モーニングトーストセット", price: 500, image: "images/モーニングトーストセット.png", options: [] },
    { id: 402, mainCategory: "モーニング", category: "モーニング", name: "モーニングプレート", price: 700, image: "images/モーニングプレート.png", options: [] }
];

const categoryMap = {
    "期間限定スイーツ": ["今月のイチオシ！"],
    "ドリンク": ["アイスコーヒー", "ホットコーヒー", "紅茶", "ソフトドリンク", "お子様用ドリンク"],
    "軽食": ["サンドイッチ", "トースト・パン"],
    "デザート": ["ケーキ", "パフェ"],
    "モーニング": ["モーニング"]
};

// ==========================================
// 2. 状態管理用変数
// ==========================================

let cart = JSON.parse(localStorage.getItem('GoodUI_Cart')) || [];
let orderHistory = []; 
let selectedProduct = null;
let currentMain = "ドリンク";
let currentSub = "アイスコーヒー";
let currentPage = 0; 
const ITEMS_PER_PAGE = 2; 

// ==========================================
// 3. 初期化処理
// ==========================================

document.addEventListener('DOMContentLoaded', init);

function init() {
    renderSubCategoryBar(); 
    renderMenu();
    updateCartCount();
    setupEventListeners();
}

// ==========================================
// 4. カテゴリー制御
// ==========================================

window.changeMainCategory = function(mainCat, element) {
    currentMain = mainCat;
    currentPage = 0; 
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');
    const subCats = categoryMap[mainCat];
    currentSub = (subCats && subCats.length > 0) ? subCats[0] : ""; 
    renderSubCategoryBar();
    renderMenu();
};

function renderSubCategoryBar() {
    const subBar = document.querySelector('.category-sub');
    if (!subBar) return;
    const subCats = categoryMap[currentMain];
    if (!subCats || subCats.length === 0) {
        subBar.innerHTML = "";
        subBar.style.display = "none"; 
        return;
    }
    subBar.style.display = "flex";
    subBar.innerHTML = subCats.map(cat => `
        <div class="sub-item ${cat === currentSub ? 'active' : ''}" 
             onclick="changeSubCategory('${cat}', this)">${cat}</div>
    `).join('');
}

window.changeSubCategory = function(subCat, element) {
    currentSub = subCat;
    currentPage = 0; 
    document.querySelectorAll('.sub-item').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');
    renderMenu();
};

// ==========================================
// 5. メニュー描画ロジック
// ==========================================

function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    const paginationControls = document.getElementById('pagination-controls');
    if (!menuGrid || !paginationControls) return;

    const allFilteredItems = menuData.filter(item => {
        const isMainMatch = item.mainCategory === currentMain;
        const isSubMatch = (currentSub === "") ? true : (item.category === currentSub);
        return isMainMatch && isSubMatch;
    });

    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const displayItems = allFilteredItems.slice(start, end);

    if (displayItems.length === 0) {
        menuGrid.innerHTML = "<p style='padding:20px;'>準備中、または商品がありません。</p>";
        paginationControls.innerHTML = "";
        return;
    }

    menuGrid.innerHTML = displayItems.map(item => `
        <div class="card" onclick="addToCart(${item.id})">
            <img src="${item.image}" alt="${item.name}">
            <div class="card-info">
                <div class="card-title">${item.name}</div>
                <div class="card-price">税込 ${item.price}円</div>
            </div>
        </div>
    `).join('');

    renderPagination(allFilteredItems.length);
}

function renderPagination(totalItems) {
    const paginationControls = document.getElementById('pagination-controls');
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    paginationControls.innerHTML = `
        <button class="page-btn" ${currentPage === 0 ? 'disabled' : ''} onclick="movePage(-1)">◀ 前のページ</button>
        <span style="font-weight:bold; font-size: 1.2em;">${currentPage + 1} / ${totalPages}</span>
        <button class="page-btn" ${currentPage >= totalPages - 1 ? 'disabled' : ''} onclick="movePage(1)">次のページ ▶</button>
    `;
}

window.movePage = function(step) {
    currentPage += step;
    renderMenu();
};

// ==========================================
// 6. カート・注文アクション
// ==========================================

window.addToCart = function(id) {
    selectedProduct = menuData.find(p => p.id === id);
    if (!selectedProduct) return;
    const optionModal = document.getElementById('option-modal');
    const nameLabel = document.getElementById('opt-product-name');
    const container = document.getElementById('opt-list-container');
    if (nameLabel) nameLabel.innerText = selectedProduct.name;
    if (container) {
        if (selectedProduct.options && selectedProduct.options.length > 0) {
            container.innerHTML = selectedProduct.options.map((opt, index) => `
                <label class="opt-item">
                    <span>${opt.name} (+${opt.price}円)</span>
                    <input type="checkbox" class="opt-checkbox" data-index="${index}">
                </label>
            `).join('');
        } else {
            container.innerHTML = "<p>選択可能なオプションはありません</p>";
        }
    }
    if (optionModal) optionModal.style.display = 'block';
};

window.confirmAddToCart = function() {
    const checkboxes = document.querySelectorAll('.opt-checkbox');
    const selectedOptions = [];
    let extraPrice = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) {
            const optIndex = parseInt(cb.getAttribute('data-index'));
            const option = selectedProduct.options[optIndex];
            selectedOptions.push(option.name);
            extraPrice += option.price;
        }
    });
    const cartItem = {
        ...selectedProduct,
        displayPrice: (selectedProduct.price || 0) + extraPrice,
        selectedOptions: selectedOptions
    };
    cart.push(cartItem);
    saveCart();
    updateCartCount();
    closeOptionModal();
}

function saveCart() {
    localStorage.setItem('GoodUI_Cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountLabel = document.getElementById('cart-count');
    const cartBtn = document.getElementById('cart-open-btn');
    if (cartCountLabel) cartCountLabel.innerText = cart.length;
    if (cartBtn) {
        if (cart.length > 0) {
            cartBtn.classList.add('active');
            cartBtn.onclick = () => {
                renderCartList();
                document.getElementById('cart-modal').style.display = 'block';
            };
        } else {
            cartBtn.classList.remove('active');
            cartBtn.onclick = null;
        }
    }
}

function renderCartList() {
    const list = document.getElementById('cart-items-list');
    const orderConfirmBtn = document.getElementById('order-confirm-btn');
    if (!list || !orderConfirmBtn) return;

    if (cart.length === 0) {
        list.innerHTML = "<p style='text-align:center; padding:50px; font-size:1.5em;'>カートは空です</p>";
        orderConfirmBtn.innerHTML = `注文を確定する`;
        orderConfirmBtn.disabled = true;
        orderConfirmBtn.style.opacity = "0.5";
        orderConfirmBtn.style.cursor = "not-allowed";
    } else {
        let html = `
            <div class="cart-header">
                <div style="grid-column: span 2;">商品</div>
                <div style="text-align:center;">価格(税込)</div>
                <div style="text-align:center;">数量</div>
                <div style="text-align:right;"></div>
            </div>
        `;
        html += cart.map((item, index) => `
            <div class="cart-item-row">
                <img src="${item.image}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-options">${item.selectedOptions ? item.selectedOptions.join(', ') : ''}</div>
                </div>
                <div class="cart-item-price">¥${(item.displayPrice || item.price).toLocaleString()}</div>
                <div class="cart-item-qty">1</div>
                <div class="cart-item-actions">
                    <button class="cart-btn-small">変更</button>
                    <button class="cart-btn-delete" onclick="removeFromCart(${index})">削除</button>
                </div>
            </div>
        `).join('');
        list.innerHTML = html;
        const total = cart.reduce((sum, item) => sum + (item.displayPrice || item.price), 0);
        orderConfirmBtn.innerHTML = `¥${total.toLocaleString()} (税込) 　注文を確定する`;
        orderConfirmBtn.disabled = false;
        orderConfirmBtn.style.opacity = "1";
        orderConfirmBtn.style.cursor = "pointer";
    }
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCartList();
};

// ==========================================
// 7. 履歴・お会計アクション
// ==========================================

function openHistoryModal() {
    const list = document.getElementById('history-items-list');
    const modal = document.getElementById('history-modal');
    if (!list || !modal) return;
    let html = `
        <div class="cart-header" style="background-color: #555;">
            <div style="grid-column: span 2;">注文商品</div>
            <div style="text-align:center;">価格(税込)</div>
            <div style="text-align:center;">注文時刻</div>
        </div>
    `;
    if (orderHistory.length === 0) {
        html += '<p style="text-align:center; padding:20px;">履歴はありません</p>';
    } else {
        html += orderHistory.map(item => `
            <div class="cart-item-row">
                <img src="${item.image}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                </div>
                <div class="cart-item-price">¥${(item.displayPrice || item.price).toLocaleString()}</div>
                <div style="text-align:center; font-weight:bold; color:#666;">${item.orderedAt}</div>
            </div>
        `).join('');
    }
    list.innerHTML = html;
    modal.style.display = 'block';
}

window.closeHistoryModal = function() {
    document.getElementById('history-modal').style.display = 'none';
};

function showCheckoutTotal() {
    const total = orderHistory.reduce((sum, item) => sum + (item.displayPrice || item.price), 0);
    alert(`お会計の合計金額は ¥${total.toLocaleString()} (税込) です。\nレジまでお越しください。`);
}

// ==========================================
// 8. モーダル・共通イベント
// ==========================================

window.closeOptionModal = function() {
    const optionModal = document.getElementById('option-modal');
    if (optionModal) optionModal.style.display = 'none';
};

function setupEventListeners() {
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const optAddToCartBtn = document.getElementById('opt-add-to-cart-btn');
    const orderConfirmBtn = document.getElementById('order-confirm-btn');
    const historyCloseBtn = document.getElementById('history-close-btn');

    if (cartCloseBtn) cartCloseBtn.onclick = () => {
        document.getElementById('cart-modal').style.display = 'none';
    };

    if (historyCloseBtn) historyCloseBtn.onclick = closeHistoryModal;

    if (optAddToCartBtn) optAddToCartBtn.onclick = confirmAddToCart;

    if (orderConfirmBtn) orderConfirmBtn.onclick = () => {
        if (cart.length === 0) return;
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        cart.forEach(item => {
            orderHistory.push({ ...item, orderedAt: timeString });
        });
        alert("注文を確定しました！");
        const historyBtn = document.getElementById('history-btn');
        if (historyBtn) {
            historyBtn.classList.remove('disabled');
            historyBtn.classList.add('btn-history-active');
            historyBtn.onclick = openHistoryModal;
        }
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.classList.remove('disabled');
            checkoutBtn.classList.add('btn-checkout-active');
            checkoutBtn.onclick = showCheckoutTotal;
        }
        cart = [];
        saveCart();
        updateCartCount();
        document.getElementById('cart-modal').style.display = 'none';
    };
}