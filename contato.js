const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaResposta = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "assunto": e.target.elements["assunto"].value,
        "mensagem": e.target.elements["mensagem"].value 
    };

    localStorage.setItem("cadastro", JSON.stringify(listaResposta));
    // Redirecionar para uma página de agradecimento
    // window.location.href = 'thanks.html';
});

// “blur” (desfoque do campo de digitação)
camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));

    // Removendo as mensagens padrão do required
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

// Mensagens Personalizadas
const tiposErros = [
    'valueMissing',
    'patternMismatch',
    'tooShort'
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de E-mail não pode estar vazio.",
        patternMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    assunto: {
        valueMissing: "O campo de assunto não pode estar vazio."
    },
    mensagem: {
        valueMissing: "O campo de mensagem não pode estar vazio."
    },
};

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');

    tiposErros.forEach(erro => {
        if(campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    });

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorInput = campo.checkValidity();

    if (!validadorInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}
