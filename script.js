// Criando variáveis para receber os IDs
let bntMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.getElementById('overlay-menu');

// Adicionando um evento às variáveis
// para abrir menu
bntMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu');
});

// para fechar menu
menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu');
});

overlay.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu');
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
