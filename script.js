// ============================================
// 1. БАЗА ДАННЫХ (Мотоциклы и Экипировка)
// ============================================
const products = [
    // --- МОТОЦИКЛЫ (Прямые ссылки на нужные модели) ---
    { 
        id: 1, name: "Husqvarna TE 300", category: "moto", price: 12500, 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Husqvarna_TE_300_2017.jpg/800px-Husqvarna_TE_300_2017.jpg", 
        desc: "Шведский эндуро. Легкий, маневренный, с мощным 2-тактным двигателем." 
    },
    { 
        id: 2, name: "KTM 300 EXC", category: "moto", price: 13000, 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/KTM_300_EXC_2017.jpg/800px-KTM_300_EXC_2017.jpg", 
        desc: "Легендарный оранжевый флагман. Инжекторный двигатель и безупречная управляемость." 
    },
    { 
        id: 3, name: "GasGas EC 300", category: "moto", price: 11000, 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Gas_Gas_EC_300_2017_a.jpg/800px-Gas_Gas_EC_300_2017_a.jpg", 
        desc: "Красный зверь. Отличный баланс цены и качества для агрессивного катания." 
    },
    
    // --- ЭКИПИРОВКА ---
    { 
        id: 4, name: "Шлем Fox V3", category: "gear", price: 850, 
        img: "https://images.unsplash.com/photo-1558981852-426c6c22a060?q=80&w=800", 
        desc: "Профессиональный мотокроссовый шлем с максимальной защитой и вентиляцией." 
    },
    { 
        id: 5, name: "Мотоботы Sidi", category: "gear", price: 1200, 
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Motocross_boot.jpeg/800px-Motocross_boot.jpeg", 
        desc: "Жесткие мотоботы для экстремального эндуро. Защита голени и стопы." 
    },
    { 
        id: 6, name: "Перчатки Enduro Pro", category: "gear", price: 150, 
        img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800", 
        desc: "Дышащие перчатки с усиленной защитой пальцев для длительных заездов." 
    }
];

let currentProductId = null;

// ============================================
// 2. НАВИГАЦИЯ МЕЖДУ ЭКРАНАМИ
// ============================================
function showScreen(screenName) {
    ['catalog', 'product', 'checkout', 'orders'].forEach(s => {
        document.getElementById(`screen-${s}`).classList.add('hidden');
    });

    const hero = document.getElementById('hero-banner');
    if (screenName === 'catalog') hero.classList.remove('hidden');
    else hero.classList.add('hidden');

    document.getElementById(`screen-${screenName}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// 3. ОТРИСОВКА КАТАЛОГА
// ============================================
function renderCatalog() {
    const motosGrid = document.getElementById('motos-grid');
    const gearGrid = document.getElementById('gear-grid');
    motosGrid.innerHTML = '';
    gearGrid.innerHTML = '';

    products.forEach(p => {
        const cardHTML = `
            <div class="card">
                <div class="card-img-wrapper">
                    <img src="${p.img}" alt="${p.name}" style="object-fit: ${p.category === 'moto' ? 'contain' : 'cover'}; background: ${p.category === 'moto' ? '#fff' : 'transparent'};">
                </div>
                <h3>${p.name}</h3>
                <div class="price">${p.price} BYN</div>
                <button class="btn" onclick="openProduct(${p.id})">Подробнее</button>
            </div>
        `;
        if (p.category === 'moto') motosGrid.innerHTML += cardHTML;
        else gearGrid.innerHTML += cardHTML;
    });
}

// ============================================
// 4. ДЕТАЛИ ТОВАРА И ЧЕКАУТ
// ============================================
function openProduct(id) {
    currentProductId = id;
    const p = products.find(item => item.id === id);
    const container = document.getElementById('product-container');

    container.innerHTML = `
        <img src="${p.img}" alt="${p.name}" style="object-fit: ${p.category === 'moto' ? 'contain' : 'cover'}; background: ${p.category === 'moto' ? '#fff' : 'transparent'};">
        <div class="info">
            <h2>${p.name}</h2>
            <p class="desc">${p.desc}</p>
            <div class="big-price">${p.price} BYN</div>
            <button class="btn" onclick="openCheckout()">🛒 Купить сейчас</button>
        </div>
    `;
    showScreen('product');
}

function openCheckout() {
    const p = products.find(item => item.id === currentProductId);
    document.getElementById('checkout-info').innerText = `Вы покупаете: ${p.name} за ${p.price} BYN`;
    showScreen('checkout');
}

// ============================================
// 5. ВАЛИДАЦИЯ ФОРМЫ И СОХРАНЕНИЕ (ЛР 24)
// ============================================
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
    document.querySelectorAll('input').forEach(el => el.classList.remove('error'));

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    let isValid = true;

    if (name.length < 3) {
        document.getElementById('error-name').innerText = "Введите ФИО (мин. 3 символа)";
        document.getElementById('error-name').style.display = 'block';
        document.getElementById('name').classList.add('error');
        isValid = false;
    }

    const phoneRegex = /^\+?[0-9\s\-\(\)]{10,20}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('error-phone').innerText = "Введите корректный телефон (напр. +375291234567)";
        document.getElementById('error-phone').style.display = 'block';
        document.getElementById('phone').classList.add('error');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('error-email').innerText = "Введите корректный Email";
        document.getElementById('error-email').style.display = 'block';
        document.getElementById('email').classList.add('error');
        isValid = false;
    }

    if (!isValid) return;

    const p = products.find(item => item.id === currentProductId);
    const order = {
        id: Date.now(),
        userName: name,
        phone: phone,
        email: email,
        productName: p.name,
        price: p.price,
        date: new Date().toLocaleString()
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert(`✅ Спасибо, ${name}!\nЗаказ на "${p.name}" оформлен.`);
    this.reset();
    showScreen('catalog');
});

// ============================================
// 6. МОИ ЗАКАЗЫ
// ============================================
function showOrders() {
    const container = document.getElementById('orders-list');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#888;">У вас пока нет заказов.</p>`;
    } else {
        container.innerHTML = '';
        orders.reverse().forEach(o => {
            container.innerHTML += `
                <div class="order-card">
                    <h4>Заказ №${o.id.toString().slice(-4)}</h4>
                    <p><strong>Товар:</strong> ${o.productName}</p>
                    <p><strong>Сумма:</strong> ${o.price} BYN</p>
                    <p><strong>Покупатель:</strong> ${o.userName}</p>
                    <p><strong>Телефон:</strong> ${o.phone}</p>
                    <p><strong>Дата:</strong> ${o.date}</p>
                </div>
            `;
        });
    }
    showScreen('orders');
}

// ============================================
// 7. ЗАПУСК ПРИ ЗАГРУЗКЕ
// ============================================
renderCatalog();
showScreen('catalog');