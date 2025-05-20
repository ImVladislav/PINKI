document.addEventListener('DOMContentLoaded', () => {
  // 🔊 Лемур-музика
  const lemur = document.querySelector('.lemur.center');
  const audio = document.getElementById('bg-music');
  if (lemur && audio) {
    lemur.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  }

  // 🍅 Помідори
  function createTomatoes() {
    const container = document.querySelector('.tomatoes-container');
    if (!container) return;

    const leftTomatoes = document.createElement('div');
    leftTomatoes.className = 'tomatoes-left';
    leftTomatoes.style.backgroundImage = "url('./img/i5.png')";

    const rightTomatoes = document.createElement('div');
    rightTomatoes.className = 'tomatoes-right';
    rightTomatoes.style.backgroundImage = "url('./img/i6.png')";

    container.appendChild(leftTomatoes);
    container.appendChild(rightTomatoes);
  }

  // 🎨 Параллакс для помідорів
  document.addEventListener('mousemove', (e) => {
    const leftTomatoes = document.querySelector('.tomatoes-left');
    const rightTomatoes = document.querySelector('.tomatoes-right');
    if (!leftTomatoes || !rightTomatoes) return;

    const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
    leftTomatoes.style.transform = `translateX(${-moveX}px)`;
    rightTomatoes.style.transform = `translateX(${moveX}px)`;
  });

  // 🐵 Лемур-підглядач при скролі
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const lemurPeek = document.querySelector('.lemur-peek');
    if (!lemurPeek) return;

    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScrollTop) {
      lemurPeek.style.transform = 'translateY(-50px)';
    } else {
      lemurPeek.style.transform = 'translateY(0)';
    }
    lastScrollTop = currentScroll;
  });

  // 🖼️ Галерея
  function initGallery() {
    const track = document.querySelector('.gallery-track');
    if (!track) return;
    let isHovered = false;

    const images = Array.from({ length: 18 }, (_, i) => {
      const img = document.createElement('img');
      img.src = `./gallery/img${i + 1}.jpg`;
      return img;
    });

    images.forEach(img => track.appendChild(img));
    images.forEach(img => track.appendChild(img.cloneNode(true)));

    track.addEventListener('mouseenter', () => isHovered = true);
    track.addEventListener('mouseleave', () => isHovered = false);

    let position = 0;
    function animate() {
      if (!isHovered) {
        position -= 0.5;
        if (position <= -track.offsetWidth / 2) {
          position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      requestAnimationFrame(animate);
    }

    animate();
  }

  // 📋 Копіювання контракту
  const contract = document.querySelector('.contract');
  const toast = document.getElementById('copy-toast');
  if (contract && toast) {
    contract.addEventListener('click', () => {
      const text = document.getElementById('contract-text')?.textContent;
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2000);
      });
    });
  }

  // Запуск
  createTomatoes();
  initGallery();
});








