// ==========================================
// 1. 動作遅延の共通関数
// ==========================================
function runWithDelay(callback, ms = 1500) {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return callback(); 
    
    overlay.style.display = 'block';
    setTimeout(() => {
        callback();
        overlay.style.display = 'none';
    }, ms);
}

// ==========================================
// 2. データ定義
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
    { id: 401, mainCategory: "モーニング", name: "モーニングトーストセット", price: 500, image: "images/モーニングトーストセット.png", options: [] },
    { id: 402, mainCategory: "モーニング", name: "モーニングプレート", price: 700, image: "images/モーニングプレート.png", options: [] }
];

// ==========================================
// 3. 状態管理
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
// 4. 関数定義
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
    //updatePaginationUI(filtered.length); //ページの愛数を表示しない
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
        changeMainCategory(mainCategories[nextIndex]);
    }
};

window.movePage = (step) => {
    const filtered = menuData.filter(item => item.mainCategory === currentMain);
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    const nextP = currentPage + step;
    if(nextP >= 0 && nextP < totalPages) {
        currentPage = nextP;
        renderMenu();
    }
};

function updatePaginationUI(totalItems) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    const label = document.getElementById('pagination-controls');
    if(label) label.innerText = `${currentPage + 1} / ${totalPages}`;
}

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

function getOptionItemsForCurrentState() {
    const id = selectedProduct.id;
    const cat = selectedProduct.mainCategory;
    if (currentOptStep === 1) {
        if (cat === "期間限定スイーツ" || cat === "軽食") return ["ドリンクセット (+300円)", "なし"];
        if (cat === "ドリンク") {
            if ([101, 104, 105, 112, 122, 132].includes(id)) return ["アイス", "ホット"];
            return ["ストローあり", "ストローなし"];
        }
        if (cat === "モーニング") return ["カフェラテ", "アイスティー", "ブレンドコーヒー", "オレンジジュース"];
    } else {
        if (cat === "期間限定スイーツ" || (cat === "軽食" && optStepData[1]["ドリンクセット (+300円)"] > 0)) {
            const setCount = optStepData[1]["ドリンクセット (+300円)"] || 0;
            return (setCount > 0) ? ["カフェラテ", "アイスティー", "ブレンドコーヒー", "オレンジジュース"] : ["オプションなし"];
        }
        if (cat === "ドリンク") {
            const iceCount = optStepData[1]["アイス"] || 0;
            if (iceCount > 0 || [102, 106, 107, 151, 152].includes(id)) return ["氷あり", "氷なし"];
        }
        return (cat === "軽食" || cat === "モーニング") ? ["パンを焼く", "なし"] : ["オプションなし"];
    }
    return ["オプションなし"];
}

function updateOptionUI() {
    const container = document.getElementById('opt-list-container');
    const items = getOptionItemsForCurrentState();
    container.innerHTML = items.map(name => {
        const currentVal = optStepData[currentOptStep][name] || 0;
        return `<div class="opt-item-qty"><span>${name}</span><div class="qty-controls"><button class="btn-minus" onclick="updateOptionQty(${currentOptStep}, '${name}', -1)">－</button><span class="qty-val">${currentVal}</span><button class="btn-plus" onclick="updateOptionQty(${currentOptStep}, '${name}', 1)">＋</button></div></div>`;
    }).join('');
    document.querySelectorAll('.step-item').forEach((el, i) => el.classList.toggle('active', i + 1 === currentOptStep));
    validateStep();
}

function validateStep() {
    const totalSelected = Object.values(optStepData[currentOptStep]).reduce((a, b) => a + b, 0);
    const nextBtn = document.getElementById('opt-next-btn');
    nextBtn.classList.toggle('disabled', totalSelected !== modalMainQty);
    nextBtn.innerText = (currentOptStep === 2) ? "確定" : "次へ";
}

window.changeStep = function(val) {
    const totalSelected = Object.values(optStepData[currentOptStep]).reduce((a, b) => a + b, 0);
    if (val > 0 && totalSelected !== modalMainQty) return showErrorFeedback();
    if (currentOptStep === 2 && val > 0) return confirmAddToCartWithQty();
    currentOptStep = Math.max(1, Math.min(2, currentOptStep + val));
    updateOptionUI();
};

function showErrorFeedback() {
    const instruction = document.querySelector('.opt-instruction');
    instruction.classList.add('error-active');
    setTimeout(() => instruction.classList.remove('error-active'), 1500);
}

// ==========================================
// 5. カート・注文・履歴
// ==========================================
window.confirmAddToCartWithQty = function() {
    const step1 = Object.entries(optStepData[1]).flatMap(([n, q]) => Array(q).fill(n));
    const step2 = Object.entries(optStepData[2]).flatMap(([n, q]) => Array(q).fill(n));
    for(let i = 0; i < modalMainQty; i++) {
        let price = selectedProduct.price + (step1[i]?.includes("+300円") ? 300 : 0);
        cart.push({ ...selectedProduct, price, displayOptions: [{name: step1[i], qty:1}, {name: step2[i], qty:1}] });
    }
    updateCartCount();
    window.closeOptionModal();
};

function updateCartCount() { document.getElementById('cart-count').innerText = cart.length; }
window.clearCart = () => { cart = []; updateCartCount(); };
window.removeItem = (i) => { cart.splice(i, 1); updateCartCount(); document.getElementById('cart-open-btn').click(); };
window.closeOptionModal = () => document.getElementById('option-modal').style.display = 'none';
window.closeHistoryModal = () => document.getElementById('history-modal').style.display = 'none';
window.closeGuideModal = () => document.getElementById('guide-modal').style.display = 'none';

// ==========================================
// 6. イベント登録（ここですべて遅延させる）
// ==========================================
function setupEventListeners() {
    const wrap = (id, ms, cb) => {
        const el = document.getElementById(id);
        if (el) el.onclick = () => runWithDelay(cb, ms);
    };

    wrap('cart-open-btn', 1200, () => {
        const list = document.getElementById('cart-items-list');
        list.innerHTML = cart.map((item, i) => `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <div class="cart-item-header"><div class="cart-item-name">${item.name}</div><div class="cart-main-qty">1</div></div>
                    <div class="cart-options-container">${item.displayOptions.map(o => `<div class="cart-option-item"><span class="opt-name">${o.name}</span><span class="opt-qty">1</span></div>`).join('')}</div>
                </div>
                <div class="cart-item-right"><span class="cart-item-price">${item.price}円</span><button onclick="removeItem(${i})" class="cart-remove-btn">削除</button></div>
            </div>
        `).join('') || "<p style='text-align:center; padding:50px;'>空です</p>";
        document.getElementById('cart-modal').style.display = 'block';
    });

    wrap('order-confirm-btn', 3000, () => {
        if(!cart.length) return;
        alert("注文を受け付けました。");
        orderHistory.push(...cart); cart = []; updateCartCount();
        document.getElementById('cart-modal').style.display = 'none';
    });

    wrap('history-btn', 1500, () => {
        const list = document.getElementById('history-items-list');
        // mapの中身を、カートの表示と同じように詳細を表示する形式に修正します
        list.innerHTML = orderHistory.map(item => `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <div class="cart-item-header">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-main-qty">1</div>
                    </div>
                    <div class="cart-options-container">
                        ${item.displayOptions.map(o => `
                            <div class="cart-option-item">
                                <span class="opt-name">${o.name}</span>
                                <span class="opt-qty">1</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="cart-item-right">
                    <span class="cart-item-price">${item.price}円</span>
                </div>
            </div>
        `).join('') || "<p style='text-align:center; padding:50px;'>履歴なし</p>";
        document.getElementById('history-modal').style.display = 'block';
    });

    wrap('guide-btn', 800, () => document.getElementById('guide-modal').style.display = 'block');
    wrap('checkout-btn', 2000, () => alert("レジへお越しください。"));
    wrap('order-continue-btn', 500, () => document.getElementById('cart-modal').style.display = 'none');
    
    document.getElementById('cart-close-btn').onclick = () => document.getElementById('cart-modal').style.display = 'none';
}

// ==========================================
// 7. 全体遅延の適用
// ==========================================
function applyGlobalDelay() {
    const targets = [
        { name: 'openOption', ms: 1200 },
        { name: 'changeStep', ms: 1000 },
        { name: 'changeMainCategory', ms: 800 },
        { name: 'movePage', ms: 800 },
        { name: 'updateMainQty', ms: 500 },
        { name: 'updateOptionQty', ms: 400 }
    ];
    targets.forEach(t => {
        const original = window[t.name];
        if (original) window[t.name] = (...args) => runWithDelay(() => original(...args), t.ms);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupEventListeners();
    applyGlobalDelay();
});