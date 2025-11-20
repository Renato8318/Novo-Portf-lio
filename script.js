// Criando variáveis para receber os IDs
let bntMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.getElementById('overlay-menu');
let closeBtn = document.querySelector('.menu-mobile .btn-close');
const mobileLinks = document.querySelectorAll('.menu-mobile nav a');

// Adicionando um evento às variáveis
// para abrir menu
bntMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu');
});
 
// Função para fechar o menu
function fecharMenu() {
    menu.classList.remove('abrir-menu');
}

// Adiciona eventos de clique para fechar o menu
closeBtn.addEventListener('click', fecharMenu);
overlay.addEventListener('click', fecharMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove a classe 'active' de todos os links antes de adicionar na nova
        mobileLinks.forEach(l => l.classList.remove('active'));
        // Adiciona a classe 'active' ao link clicado
        link.classList.add('active');
        fecharMenu(); // Fecha o menu após o clique
    });
});

// Animações
const myObserver = new IntersectionObserver((entrada) =>{
    entrada.forEach( (entry) => {
        if(entry.isIntersecting === true){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    })
})

const elements = document.querySelectorAll('.hidden');

elements.forEach( (element) => myObserver.observe(element));

// Saudações
// Obter id da saudações
const greetingElement = document.getElementById("greeting");

// Obter horas do sistema
const currentHour = new Date().getHours();

// Verificar horas e mostrar mensagem
const greetingMessage =
  currentHour >= 5 && currentHour < 12
    ? "Olá,Bom dia! Sou Renato Paiva"
    : currentHour >= 12 && currentHour < 18
    ? "Olá,Boa tarde! Sou Renato Paiva"
    : "Olá,Boa noite! Sou Renato Paiva";

greetingElement.textContent = greetingMessage;

// Efeito de Digitação na Faixa de Boas-Vindas
function typeWriterEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const text = "Seja bem-vindo ao meu universo digital!";
    textElement.innerHTML = text; // Coloca o texto de uma vez

    // Calcula a duração da animação baseada no tamanho do texto
    const typingSpeed = 3.5; // segundos
    const textLength = text.length;

    // Adiciona a animação de digitação via CSS
    textElement.style.width = `${textLength}ch`; // 'ch' é a largura de um caractere '0'
    textElement.style.animation += `, typing ${typingSpeed}s steps(${textLength})`;
    textElement.style.animationFillMode = 'forwards';
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o efeito de digitação
    typeWriterEffect();

    // --- Lógica Genérica para Carrossel Infinito ---
    function setupCarousel(containerId, leftArrowClass, rightArrowClass) {
        const carousel = document.getElementById(containerId);
        const leftArrow = document.querySelector(leftArrowClass);
        const rightArrow = document.querySelector(rightArrowClass);

        if (!carousel || !leftArrow || !rightArrow) return;

        const items = Array.from(carousel.children);
        if (items.length === 0) return;

        // Verifica se a largura total dos itens é menor que a do contêiner
        const totalItemsWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0) + (items.length * 40);

        if (totalItemsWidth <= carousel.clientWidth) {
            // Se não precisar rolar, esconde as setas e centraliza os itens
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
            carousel.style.justifyContent = 'center';
            return; // Encerra a função aqui
        }

        const scrollAmount = items[0].offsetWidth + 40; // Largura do card + gap
        let isScrolling = false;

        // Clonar itens para criar o loop
        const itemsToClone = Math.min(items.length, 5);
        for (let i = 0; i < itemsToClone; i++) {
            const clone = items[i].cloneNode(true);
            carousel.appendChild(clone);
        }

        function handleScroll(direction) {
            if (isScrolling) return;
            isScrolling = true;

            const scrollEnd = carousel.scrollWidth - carousel.clientWidth;

            if (direction === 'right') {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                if (carousel.scrollLeft >= scrollEnd - scrollAmount) {
                    setTimeout(() => {
                        carousel.scrollTo({ left: carousel.scrollLeft - (items.length * scrollAmount), behavior: 'auto' });
                    }, 300); // Animação mais rápida
                }
            } else if (direction === 'left') {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }

            setTimeout(() => { isScrolling = false; }, 300); // Prevenção de clique mais rápida
        }

        leftArrow.addEventListener('click', () => handleScroll('left'));
        rightArrow.addEventListener('click', () => handleScroll('right'));
    }

    // Inicializa os dois carrosséis
    setupCarousel('carousel-container', '.arrow-left', '.arrow-right');
    setupCarousel('conquistas-carousel-container', '.conquistas-arrow-left', '.conquistas-arrow-right');
    setupCarousel('skills-carousel-container', '.skills-arrow-left', '.skills-arrow-right');
});

// Lógica para o botão "Voltar ao Topo"
const backToTopButton = document.getElementById('back-to-top-btn');

const footer = document.querySelector('footer');

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Se o rodapé está visível, mostra o botão
            backToTopButton.classList.add('show');
        } else {
            // Se o rodapé não está visível, esconde o botão
            backToTopButton.classList.remove('show');
        }
    });
});

// Inicia a observação do rodapé
footerObserver.observe(footer);
