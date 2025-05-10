// Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mode toggle button
    const modeToggle = document.createElement('div');
    modeToggle.innerHTML = `
      <button id="modeToggle" class="mode-toggle">
        <i class="fas fa-moon"></i>
      </button>
    `;
    document.querySelector('header').appendChild(modeToggle);
  
    // Mode toggle functionality
    const modeBtn = document.getElementById('modeToggle');
    let darkMode = true;
  
    modeBtn.addEventListener('click', () => {
      darkMode = !darkMode;
      updateMode();
    });
  
    function updateMode() {
      const body = document.body;
      const buttons = document.querySelectorAll('.btn, .hire-btn');
      const socialIcons = document.querySelectorAll('.social-icons a');
      const spans = document.querySelectorAll('span');
      
      if (darkMode) {
        body.style.backgroundColor = '#311835';
        body.style.color = 'white';
        modeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        
        buttons.forEach(btn => {
          btn.style.backgroundColor = 'white';
          btn.style.color = '#311835';
          btn.style.borderColor = '#311835';
        });
        
        socialIcons.forEach(icon => {
          icon.style.borderColor = 'white';
          icon.querySelector('i').style.color = 'white';
        });
        
        spans.forEach(span => {
          span.style.color = '#ffe8ab';
        });
      } else {
        body.style.backgroundColor = '#ffe8ab';
        body.style.color = '#331835';
        modeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        
        buttons.forEach(btn => {
          btn.style.backgroundColor = '#331835';
          btn.style.color = '#ffe8ab';
          btn.style.borderColor = '#ffe8ab';
        });
        
        socialIcons.forEach(icon => {
          icon.style.borderColor = '#331835';
          icon.querySelector('i').style.color = '#331835';
        });
        
        spans.forEach(span => {
          span.style.color = '#331835';
        });
      }
    }
  
    // Add Font Awesome for icons (only if not already included)
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const faLink = document.createElement('link');
      faLink.rel = 'stylesheet';
      faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
      document.head.appendChild(faLink);
    }
  
    // Slideshow Gallery
    function initializeGallery() {
      // Only create gallery if not already exists
      if (!document.querySelector('.gallery-container')) {
        const galleryHTML = `
          <div class="gallery-container">
            <h2>My Art Gallery</h2>
            <div class="slideshow">
              <div class="slide active">
                <img src="images/art1.jpg" alt="Digital Art 1">
              </div>
              <div class="slide">
                <img src="images/art2.jpg" alt="Digital Art 2">
              </div>
              <div class="slide">
                <img src="images/art3.jpg" alt="Digital Art 3">
              </div>
              <button class="slide-btn prev-btn">❮</button>
              <button class="slide-btn next-btn">❯</button>
            </div>
            <div class="dots-container">
              <span class="dot active"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        `;
        
        // Insert gallery before footer or at end of main content
        const mainContent = document.querySelector('main') || document.body;
        mainContent.insertAdjacentHTML('beforeend', galleryHTML);
  
        // Slideshow functionality
        let slideIndex = 0;
        let slideInterval;
  
        function showSlides() {
          const slides = document.querySelectorAll('.slide');
          const dots = document.querySelectorAll('.dot');
          
          slides.forEach(slide => slide.classList.remove('active'));
          dots.forEach(dot => dot.classList.remove('active'));
          
          slideIndex++;
          if (slideIndex > slides.length) slideIndex = 1;
          
          slides[slideIndex-1].classList.add('active');
          dots[slideIndex-1].classList.add('active');
        }
  
        function startSlideShow() {
          slideInterval = setInterval(showSlides, 3000);
        }
  
        document.querySelector('.prev-btn')?.addEventListener('click', () => {
          clearInterval(slideInterval);
          const slides = document.querySelectorAll('.slide');
          const dots = document.querySelectorAll('.dot');
          
          slides.forEach(slide => slide.classList.remove('active'));
          dots.forEach(dot => dot.classList.remove('active'));
          
          slideIndex--;
          if (slideIndex < 0) slideIndex = slides.length - 1;
          
          slides[slideIndex].classList.add('active');
          dots[slideIndex].classList.add('active');
          startSlideShow();
        });
  
        document.querySelector('.next-btn')?.addEventListener('click', () => {
          clearInterval(slideInterval);
          showSlides();
          startSlideShow();
        });
  
        document.querySelectorAll('.dot')?.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.dot');
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slideIndex = index;
            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active');
            startSlideShow();
          });
        });
  
        startSlideShow();
      }
    }
  
    // Digital Clock
    function initializeClock() {
      // Only create clock if not already exists
      if (!document.querySelector('.digital-clock')) {
        const clockHTML = `
          <div class="digital-clock">
            <div id="time"></div>
            <div id="date"></div>
          </div>
        `;
        
        // Insert clock where you want it (e.g., in header)
        document.querySelector('header').insertAdjacentHTML('beforeend', clockHTML);
  
        function updateClock() {
          const now = new Date();
          const timeElement = document.getElementById('time');
          const dateElement = document.getElementById('date');
          
          const hours = now.getHours().toString().padStart(2, '0');
          const minutes = now.getMinutes().toString().padStart(2, '0');
          const seconds = now.getSeconds().toString().padStart(2, '0');
          
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          
          const dayName = days[now.getDay()];
          const monthName = months[now.getMonth()];
          const date = now.getDate();
          const year = now.getFullYear();
          
          if (timeElement) timeElement.textContent = `${hours}:${minutes}:${seconds}`;
          if (dateElement) dateElement.textContent = `${dayName}, ${monthName} ${date}, ${year}`;
        }
  
        setInterval(updateClock, 1000);
        updateClock();
      }
    }
  
    // Strikethrough text style
    const style = document.createElement('style');
    style.textContent = `
      del {
        font-family: Arial, sans-serif;
        text-decoration: line-through;
        color: #888;
      }
      .mode-toggle {
        background: transparent;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-left: 1rem;
      }
      .gallery-container {
        margin: 5rem auto;
        max-width: 800px;
        position: relative;
      }
      .slideshow {
        position: relative;
        height: 500px;
        overflow: hidden;
      }
      .slide {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 1s ease;
      }
      .slide.active {
        opacity: 1;
      }
      .slide img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .slide-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        padding: 1rem;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10;
      }
      .prev-btn {
        left: 0;
      }
      .next-btn {
        right: 0;
      }
      .dots-container {
        text-align: center;
        margin-top: 1rem;
      }
      .dot {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin: 0 5px;
        background-color: #bbb;
        border-radius: 50%;
        cursor: pointer;
      }
      .dot.active {
        background-color: #ffe8ab;
      }
      .digital-clock {
        text-align: center;
        margin: 2rem 0;
        font-family: 'Poppins', sans-serif;
      }
      #time {
        font-size: 3rem;
        font-weight: 600;
      }
      #date {
        font-size: 1.5rem;
        margin-top: 0.5rem;
      }
    `;
    document.head.appendChild(style);
  
    // Initialize features
    initializeGallery();
    initializeClock();
  });