document.addEventListener('DOMContentLoaded', function() {

    const products = {
        wine: {
            title: "Wine's glass",
            img: "images/wine-glass.jpg",
            description: "Сумка из алых акриловых бусин ручной работы. Идеально подходит для вечерних выходов.",
            price: "5 200 ₽"
        },
        glamor: {
            title: "Glamor",
            img: "images/glamor.jpg",
            description: "Розовая сумка ручной работы с бисерным узором. Легкая и вместительная.",
            price: "5 500 ₽"
        },
        melanchol: {
            title: "Melanchol",
            img: "images/melanchol.jpg",
            description: "Элегантный клатч для особых случаев. Сдержанный дизайн и качественная отделка.",
            price: "4 800 ₽"
        },
        winter: {
            title: "Winter",
            img: "images/winter.jpg",
            description: "Классическая сумка в зимних тонах. Теплые оттенки и уютный дизайн.",
            price: "5 000 ₽"
        },
        summer: {
            title: "Summer",
            img: "images/summer.jpg",
            description: "Летняя сумка с яркими акцентами. Легкая и воздушная, как летний бриз.",
            price: "4 900 ₽"
        },
        autumn: {
            title: "Autumn",
            img: "images/autumn.jpg",
            description: "Осенняя сумка в теплых тонах. Напоминает о золотой осени и уютных вечерах.",
            price: "5 100 ₽"
        },
        spring: {
            title: "Spring",
            img: "images/spring.jpg",
            description: "Весенняя сумка с нежными цветами. Символ пробуждения природы.",
            price: "4 700 ₽"
        }
    };

    // Элементы модального окна
    const modal = document.getElementById('product-modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalImg = document.querySelector('.modal-img');
    const modalDescription = document.querySelector('.modal-description');
    const modalPrice = document.querySelector('.modal-price');
    const modalClose = document.querySelector('.modal-close');
    const btnBuy = document.querySelector('.btn-buy');

    // Элементы навигации
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // Кнопка "Наверх"
    const scrollTopBtn = document.getElementById('scroll-top');

    // Функция открытия модального окна
    function openModal(productId) {
        const product = products[productId];
        if (!product) return;
        
        modalTitle.textContent = product.title;
        modalImg.src = product.img;
        modalImg.alt = product.title;
        modalDescription.textContent = product.description;
        modalPrice.textContent = product.price;
        
        // Установка обработчика для кнопки "Купить"
        btnBuy.onclick = function() {
            alert(`Товар "${product.title}" добавлен в корзину! Цена: ${product.price}`);
            closeModal();
        };
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Назначение обработчиков для карточек товаров
    document.querySelectorAll('.card').forEach(card => {
        // Клик по всей карточке
        card.addEventListener('click', function(e) {
            // Проверяем, не кликнули ли мы по кнопке "Смотреть товар"
            if (!e.target.closest('.btn-view')) {
                const productId = this.dataset.product;
                openModal(productId);
            }
        });
        
        // Клик по кнопке "Смотреть товар"
        const viewBtn = card.querySelector('.btn-view');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Останавливаем всплытие, чтобы не сработал клик по карточке
                const productId = card.dataset.product;
                openModal(productId);
            });
        }
    });

    // Закрытие модального окна
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие по Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Бургер-меню
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            menuToggle.textContent = '☰';
        });
    });

    // Кнопка "Наверх"
    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Оптимизация производительности
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Используем throttle для оптимизации
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                toggleScrollButton();
                scrollTimeout = null;
            }, 100);
        }
    });

    // Lazy loading для изображений (если браузер не поддерживает нативно)
    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback для старых браузеров
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // Инициализация
    toggleScrollButton();
});