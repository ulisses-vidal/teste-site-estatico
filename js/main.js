// Variáveis globais
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const header = document.querySelector('.header');
const testimonialSlider = document.getElementById('testimonialSlider');
const dots = document.querySelectorAll('.dot');

// Funções de inicialização
document.addEventListener('DOMContentLoaded', function() {
    initCookieBanner();
    initMobileMenu();
    initTestimonialSlider();
    initScrollEffects();
});

// Banner de Cookies
function initCookieBanner() {
    // Verifica se o usuário já aceitou os cookies
    if (localStorage.getItem('cookiesAccepted') !== 'true') {
        cookieBanner.style.display = 'block';
    } else {
        cookieBanner.style.display = 'none';
    }

    // Evento de clique no botão de aceitar
    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
    });
}

// Menu Mobile
function initMobileMenu() {
    mobileMenuToggle.addEventListener('click', function() {
        header.classList.toggle('mobile-menu-active');
        
        // Animação do ícone do menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (header.classList.contains('mobile-menu-active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (header.classList.contains('mobile-menu-active')) {
                header.classList.remove('mobile-menu-active');
                
                // Resetar ícone do menu
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

// Slider de Depoimentos
function initTestimonialSlider() {
    if (!testimonialSlider) return;
    
    let currentSlide = 0;
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    
    // Função para mostrar um slide específico
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Configurar eventos de clique nos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Avançar slide automaticamente a cada 5 segundos
    setInterval(() => {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) {
            nextSlide = 0;
        }
        showSlide(nextSlide);
    }, 5000);
}

// Efeitos de Scroll
function initScrollEffects() {
    // Adicionar classe ativa ao menu conforme a seção visível
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', function() {
        // Header com sombra ao rolar
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Destacar item do menu conforme a seção visível
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Animação de entrada para elementos ao scrollar
        animateOnScroll();
    });
}

// Animação de elementos ao entrar na viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}

// Função para criar o efeito de digitação no título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Adicionar classes de animação aos elementos
window.addEventListener('load', function() {
    // Adicionar classe para animação de entrada
    const animatedElements = document.querySelectorAll('.service-card, .stat-card, .contact-card');
    animatedElements.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Efeito de digitação no título principal (se existir)
    const mainTitle = document.querySelector('.hero-content h1');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        setTimeout(() => {
            typeWriter(mainTitle, originalText, 70);
        }, 500);
    }
});
