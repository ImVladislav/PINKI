// Создание помидоров
function createTomatoes() {
    const container = document.querySelector('.tomatoes-container');
    
    // Создаем левую группу помидоров
    const leftTomatoes = document.createElement('div');
    leftTomatoes.className = 'tomatoes-left';
    leftTomatoes.style.backgroundImage = "url('./img/i5.png')";
    
    // Создаем правую группу помидоров
    const rightTomatoes = document.createElement('div');
    rightTomatoes.className = 'tomatoes-right';
    rightTomatoes.style.backgroundImage = "url('./img/i6.png')";
    
    container.appendChild(leftTomatoes);
    container.appendChild(rightTomatoes);
}

// Параллакс эффект для помидоров
document.addEventListener('mousemove', (e) => {
    const leftTomatoes = document.querySelector('.tomatoes-left');
    const rightTomatoes = document.querySelector('.tomatoes-right');
    const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
    
    leftTomatoes.style.transform = `translateX(${-moveX}px)`;
    rightTomatoes.style.transform = `translateX(${moveX}px)`;
});

// Анимация лемура при скролле
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const lemurPeek = document.querySelector('.lemur-peek');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScrollTop) {
        // Скролл вниз - поднимаем голову лемура
        lemurPeek.style.transform = 'translateY(-50px)'; // Поднимаем на 20px вверх
    } else {
        // Скролл вверх - возвращаем в исходное положение
        lemurPeek.style.transform = 'translateY(0)';
    }
    lastScrollTop = currentScroll;
});

// Функция для галереи
function initGallery() {
    const track = document.querySelector('.gallery-track');
    let isHovered = false;
    
    // Создаем массив из 18 изображений
    const images = Array.from({length: 18}, (_, i) => {
        const img = document.createElement('img');
        img.src = `./gallery/img${i + 1}.jpg`; // Обновлен путь к изображениям
        return img;
    });
    
    // Добавляем изображения в track
    images.forEach(img => track.appendChild(img));
    
    // Дублируем изображения для бесконечной прокрутки
    images.forEach(img => track.appendChild(img.cloneNode(true)));
    
    // Обработчики событий для остановки/запуска анимации
    track.addEventListener('mouseenter', () => isHovered = true);
    track.addEventListener('mouseleave', () => isHovered = false);
    
    // Анимация прокрутки
    let position = 0;
    function animate() {
        if (!isHovered) {
            position -= 0.5; // Скорость прокрутки
            
            // Сброс позиции для бесконечной прокрутки
            if (position <= -track.offsetWidth / 2) {
                position = 0;
            }
            
            track.style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createTomatoes();
    initGallery();
});


//Копіювання єбучого контракту


function copyContract() {
  const text = document.getElementById('contract-text').textContent;

  // Копіювання в буфер
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById('copy-toast');
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  });
}