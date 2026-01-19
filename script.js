// ==========================================
// 1. データ定義
// ==========================================
const menuData = [
    { id: 11, mainCategory: "期間限定スイーツ", name: "贅沢イチゴのケーキ", price: 800, image: "images/贅沢イチゴのケーキ.png", options: [] },
    { id: 12, mainCategory: "期間限定スイーツ", name: "かぼちゃケーキ", price: 700, image: "images/かぼちゃケーキ.png", options: [] },
    
    { id: 101, mainCategory: "ドリンク", name: "カフェラテ", price: 500, image: "images/カフェオレ.png", options: [{name: "砂糖", price: 0}] },
    { id: 102, mainCategory: "ドリンク", name: "アイスティー", price: 500, image: "images/ダージリン.png", options: [] },
    { id: 104, mainCategory: "ドリンク", name: "ブレンドコーヒー", price: 500, image: "images/ブレンドコーヒー.png", options: [{name: "ガムシロップ", price: 0}, {name: "ミルク", price: 0}] },
    { id: 105, mainCategory: "ドリンク", name: "ミルクティー", price: 500, image: "images/ミルクティー.png", options: [] },
    { id: 106, mainCategory: "ドリンク", name: "オレンジジュース", price: 400, image: "images/オレンジジュース.png", options: [{name: "氷なし", price: 0}] },
    { id: 107, mainCategory: "ドリンク", name: "コーラ", price: 400, image: "images/コーラ.png", options: [{name: "氷なし", price: 0}] },
    { id: 112, mainCategory: "ドリンク", name: "カフェオレ", price: 650, image: "images/カフェオレ.png", options: [{name: "ガムシロップ", price: 0}] },
    { id: 122, mainCategory: "ドリンク", name: "アメリカーノ", price: 600, image: "images/アメリカーノ.png", options: [{name: "濃いめ", price: 0}, {name: "薄め", price: 0}] },
    { id: 132, mainCategory: "ドリンク", name: "ダージリン", price: 500, image: "images/ダージリン.png", options: [{name: "砂糖", price: 0}, {name: "レモン", price: 0}] },
    { id: 151, mainCategory: "ドリンク", name: "アップルジュース", price: 300, image: "images/オレンジジュース.png", options: [{name: "氷なし", price: 0}] },
    { id: 152, mainCategory: "ドリンク", name: "ぶどうジュース", price: 300, image: "images/オレンジジュース.png", options: [{name: "氷なし", price: 0}] },

    { id: 201, mainCategory: "軽食", name: "BLTサンド", price: 700, image: "images/BLTサンド.png", options: [] },
    { id: 202, mainCategory: "軽食", name: "たまごサンド", price: 600, image: "images/たまごサンド.png", options: [] },
    { id: 203, mainCategory: "軽食", name: "ピザトースト", price: 650, image: "images/ピザトースト.png", options: [] },
    { id: 213, mainCategory: "軽食", name: "ハムチーズサンド", price: 650, image: "images/ハムチーズサンド.png", options: [] },
    { id: 222, mainCategory: "軽食", name: "トースト", price: 450, image: "images/トースト.png", options: [] },
    { id: 223, mainCategory: "軽食", name: "クロワッサン", price: 400, image: "images/クロワッサン.png", options: [] },

    { id: 301, mainCategory: "デザート", name: "チーズケーキ", price: 600, image: "images/チーズケーキ.png", options: [] },
    { id: 302, mainCategory: "デザート", name: "贅沢イチゴのケーキ", price: 800, image: "images/贅沢イチゴのケーキ.png", options: [] },
    { id: 303, mainCategory: "デザート", name: "かぼちゃケーキ", price: 700, image: "images/かぼちゃケーキ.png", options: [] },
    { id: 304, mainCategory: "デザート", name: "チョコパフェ", price: 850, image: "images/チョコパフェ.png", options: [] },
    { id: 305, mainCategory: "デザート", name: "抹茶パフェ", price: 850, image: "images/抹茶パフェ.png", options: [] },

    { id: 401, mainCategory: "モーニング", name: "モーニングトーストセット", price: 500, image: "images/モーニングトーストセット.png", options: [] },
    { id: 402, mainCategory: "モーニング", name: "モーニングプレート", price: 700, image: "images/モーニングプレート.png", options: [] }
];

// ==========================================
// 2. 状態管理
// ==========================================
let cart = [];
let orderHistory = [];
let currentMain = "ドリンク";
let currentPage = 0;
const ITEMS_PER_PAGE = 6;

let selectedProduct = null;
let currentOptStep = 1;
let modalMainQty = 1;
let optStepData = { 1: {}, 2: {} };

const mainCategories = ["期間限定スイーツ", "ドリンク", "軽食", "デザート", "モーニング"];

// ==========================================
// 3. 初期化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupEventListeners();
});

// ==========================================
// 4. メニュー描画ロジック
// ==========================================
function renderMenu() {
    const grid = document.getElementById('menu-grid');
    const filtered = menuData.filter(item => item.mainCategory === currentMain);
    const start = currentPage * ITEMS_PER_PAGE;
    const displayItems = filtered.slice(start, start + ITEMS_PER_PAGE);

    grid.innerHTML = displayItems.map(item => `
        <div class="card" onclick="openOption(${item.id})">
            <img src="${item.image}">
            <div class="card-info">
                <div class="card-title">${item.name}</div>
                <div class="card-price">${item.price}円(税抜)</div>
            </div>
        </div>
    `).join('');
    updatePaginationUI(filtered.length);
}

window.changeMainCategory = function(mainCat, element) {
    currentMain = mainCat;
    currentPage = 0;
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');
    renderMenu();
};

window.cycleMainCategory = function(step) {
    let currentIndex = mainCategories.indexOf(currentMain);
    let nextIndex = currentIndex + step;
    if (nextIndex >= 0 && nextIndex < mainCategories.length) {
        const nextCategory = mainCategories[nextIndex];
        const items = document.querySelectorAll('.category-item');
        changeMainCategory(nextCategory, items[nextIndex]);
    }
};

function updatePaginationUI(totalItems) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    const label = document.getElementById('pagination-controls');
    if(label) label.innerText = `${currentPage + 1} / ${totalPages}`;

    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    if(prevBtn) prevBtn.classList.toggle('disabled', currentPage === 0);
    if(nextBtn) nextBtn.classList.toggle('disabled', currentPage >= totalPages - 1);
}

window.movePage = (step) => {
    const filtered = menuData.filter(item => item.mainCategory === currentMain);
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    const nextP = currentPage + step;
    if(nextP >= 0 && nextP < totalPages) {
        currentPage = nextP;
        renderMenu();
    }
};

// ==========================================
// 5. オプションモーダル・ロジック
// ==========================================
window.openOption = function(id) {
    selectedProduct = menuData.find(p => p.id === id);
    document.getElementById('opt-product-name').innerText = selectedProduct.name;
    
    currentOptStep = 1;
    modalMainQty = 1;
    document.getElementById('opt-main-qty').innerText = modalMainQty;
    optStepData = { 1: {}, 2: {} };
    
    updateOptionUI();
    document.getElementById('option-modal').style.display = 'block';
};

window.updateMainQty = function(val) {
    modalMainQty = Math.max(1, modalMainQty + val);
    document.getElementById('opt-main-qty').innerText = modalMainQty;
    validateStep();
};

window.updateOptionQty = function(step, key, val) {
    if (!optStepData[step][key]) optStepData[step][key] = 0;
    optStepData[step][key] = Math.max(0, optStepData[step][key] + val);
    updateOptionUI();
};

function updateOptionUI() {
    const container = document.getElementById('opt-list-container');
    let items = [];

    if (currentOptStep === 1) {
        items = (selectedProduct.mainCategory === "ドリンク") ? ["アイス", "ホット"] : ["店内で食べる", "持ち帰り"];
    } else {
        if (selectedProduct.options && selectedProduct.options.length > 0) {
            items = selectedProduct.options.map(o => o.name);
        } else {
            items = ["オプションなし"];
        }
    }

    container.innerHTML = items.map(name => {
        const currentVal = optStepData[currentOptStep][name] || 0;
        return `
            <div class="opt-item-qty">
                <span>${name}</span>
                <div class="qty-controls">
                    <button onclick="updateOptionQty(${currentOptStep}, '${name}', -1)">－</button>
                    <span class="qty-val">${currentVal}</span>
                    <button onclick="updateOptionQty(${currentOptStep}, '${name}', 1)">＋</button>
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.step-item').forEach((el, i) => {
        el.classList.toggle('active', i + 1 === currentOptStep);
    });
    validateStep();
}

function validateStep() {
    const currentStepOptions = optStepData[currentOptStep];
    const totalSelected = Object.values(currentStepOptions).reduce((a, b) => a + b, 0);
    const nextBtn = document.getElementById('opt-next-btn');
    const prevBtn = document.getElementById('opt-prev-btn');

    if (totalSelected === modalMainQty) {
        nextBtn.classList.remove('disabled');
        nextBtn.innerText = currentOptStep === 2 ? "確定" : "次へ";
    } else {
        nextBtn.classList.add('disabled');
        const diff = modalMainQty - totalSelected;
        nextBtn.innerText = diff > 0 ? `あと ${diff} 個選択` : `${Math.abs(diff)} 個多いです`;
    }
    prevBtn.classList.toggle('disabled', currentOptStep === 1);
}

window.changeStep = function(val) {
    const currentStepOptions = optStepData[currentOptStep];
    const totalSelected = Object.values(currentStepOptions).reduce((a, b) => a + b, 0);

    if (val > 0 && totalSelected !== modalMainQty) return;
    if (currentOptStep === 2 && val > 0) {
        confirmAddToCartWithQty();
        return;
    }
    currentOptStep = Math.max(1, Math.min(2, currentOptStep + val));
    updateOptionUI();
};

function confirmAddToCartWithQty() {
    for(let i=0; i<modalMainQty; i++) {
        cart.push({ ...selectedProduct });
    }
    updateCartCount();
    closeOptionModal();
}

window.closeOptionModal = () => document.getElementById('option-modal').style.display = 'none';

// ==========================================
// 6. カート・注文履歴
// ==========================================
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

window.clearCart = () => {
    if(confirm("カートをすべて取り消しますか？")) {
        cart = [];
        updateCartCount();
    }
};

document.getElementById('cart-open-btn').onclick = () => {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = cart.map((item, i) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid #ddd; background:white;">
            <span>${item.name}</span>
            <span>${item.price}円 <button onclick="removeItem(${i})" style="margin-left:10px;">削除</button></span>
        </div>
    `).join('') || "<p style='text-align:center; padding:50px;'>カートに商品がありません</p>";
    document.getElementById('cart-modal').style.display = 'block';
};

window.removeItem = (i) => {
    cart.splice(i, 1);
    updateCartCount();
    document.getElementById('cart-open-btn').click();
};

document.getElementById('order-confirm-btn').onclick = () => {
    if(!cart.length) return;
    alert("注文を受け付けました。");
    orderHistory.push(...cart);
    cart = [];
    updateCartCount();
    document.getElementById('cart-modal').style.display = 'none';
};

document.getElementById('history-btn').onclick = () => {
    const list = document.getElementById('history-items-list');
    list.innerHTML = orderHistory.map(item => `
        <div style="padding:15px; border-bottom:1px solid #eee; background:white;">${item.name} - ${item.price}円</div>
    `).join('') || "<p style='text-align:center; padding:30px;'>注文履歴はありません</p>";
    document.getElementById('history-modal').style.display = 'block';
};

window.closeHistoryModal = () => document.getElementById('history-modal').style.display = 'none';

function setupEventListeners() {
    document.getElementById('cart-close-btn').onclick = () => {
        document.getElementById('cart-modal').style.display = 'none';
    };
}