const eventos = [
    {
        id: 1,
        title: 'Dom Casmurro',
        type: 'tech',
        description: '"Dom Casmurro" narra a vida de Bentinho, que desconfia da traição de sua esposa Capitu com seu melhor amigo, Escobar. Marcado pelo ciúme e dúvida, o romance de Machado de Assis questiona a verdade dos fatos e a confiabilidade do narrador.',
        image: 'https://www.davincivix.com.br/wp-content/uploads/2021/03/Dom-Casmurro-abre-800x500-1.jpg'
    },
    {
        id: 2,
        title: 'A Redoma de Vidro',
        type: 'tech',
        description: 'Esther Greenwood é uma jovem brilhante que enfrenta uma crise existencial e afunda em depressão. Um retrato sensível e intenso da saúde mental e da busca por identidade em meio às pressões sociais dos anos 1950.',
        image: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/5b987e7d-c65e-46ff-8fc3-5ab038eb7258.__CR0,0,300,300_PT0_SX300_V1___.jpg'
    },
    {
        id: 3,
        title: 'O Pequeno Príncipe',
        type: 'cultural',
        description: 'Um piloto encontra um garoto vindo de outro planeta. Através de encontros simbólicos, a obra reflete sobre amor, amizade e o que realmente importa, com uma simplicidade poética que encanta leitores de todas as idades.',
        image: 'https://cdn.asemanacuritibanos.com.br/wp-content/uploads/2025/05/pequeno-principe-aparencia-comportamento.jpg'
    },
    {
        id: 4,
        title: ' A Revolução dos Bichos – George Orwell',
        type: 'academic',
        description: 'Animais de uma fazenda se rebelam contra os humanos e criam seu próprio governo. Com o tempo, a nova ordem se corrompe. Uma crítica poderosa aos regimes totalitários disfarçada de fábula.',
        image: 'https://media.gazetadopovo.com.br/2021/10/19102658/rdb-660x372.jpg'
    }
];

// Função para criar os cards do carrossel
const carousel = document.querySelector('.carousel');
function createCards() {
    eventos.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
        `;
        carousel.appendChild(card);
    });
}

let index = 0;
let autoSlideInterval;

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextCard() {
    index = (index + 1) % eventos.length;
    updateCarousel();
}

function prevCard() {
    index = (index - 1 + eventos.length) % eventos.length;
    updateCarousel();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextCard, 5000); 
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval); 
}

function resumeAutoSlide() {
    startAutoSlide(); 
}

document.getElementById('nextBtn').addEventListener('click', nextCard);
document.getElementById('prevBtn').addEventListener('click', prevCard);

document.addEventListener("DOMContentLoaded", () => {
    createCards();
    startAutoSlide();

    const themeToggle = document.getElementById("themeToggle");
    const themeMenu = document.getElementById("themeMenu");
    const themeButtons = document.querySelectorAll(".theme-btn");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.setAttribute("data-theme", savedTheme);
    }

    themeToggle.addEventListener("click", () => {
        themeMenu.classList.toggle("hidden");
    });

    themeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const selectedTheme = e.target.getAttribute("data-theme");
            document.body.setAttribute("data-theme", selectedTheme);
            localStorage.setItem("theme", selectedTheme);
            themeMenu.classList.add("hidden");
        });
    });
});

const hamburgerMenu = document.getElementById("hamburgerMenu");
const menu = document.getElementById("menu");

hamburgerMenu.addEventListener("click", function() {
    menu.classList.toggle("show");
});

let startX;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
});

carousel.addEventListener('mouseover', stopAutoSlide);
carousel.addEventListener('mouseout', resumeAutoSlide);

const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
const listaCarrinho = document.getElementById('lista-carrinho');
const btnFinalizar = document.getElementById('finalizar');
const btnEsvaziar = document.getElementById('esvaziar')
const modal = document.getElementById('modal-confirmacao');
const btnConfirmar = document.getElementById('confirmar');
const btnCancelar = document.getElementById('cancelar');
const mensagemDiv = document.querySelector('.mensagem');

let carrinho = [];

    botoesAdicionar.forEach(botao => {
      botao.addEventListener('click', () => {
        const livro = botao.parentElement;
        const titulo = livro.dataset.titulo;
        carrinho.push(titulo);
        atualizarCarrinho();
      });
    });

    function atualizarCarrinho() {
      listaCarrinho.innerHTML = '';
      carrinho.forEach(titulo => {
        const li = document.createElement('li');
        li.textContent = titulo;
        listaCarrinho.appendChild(li);
      });
    }

    function atualizarDados() {
    returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);

    const day = returnDate.getDate();
    const month = returnDate.getMonth() + 1; // Janeiro é 0, por isso +1
    const year = returnDate.getFullYear();

    const returnDateText = `${day}/${month}/${year}`;

    if (carrinho.length !== 0) {
        mensagemDiv.innerHTML = `
        <span class="material-icons-outlined">notifications_active</span>
        <p>Você reservou ${carrinho.length} livro(s). <strong>Data de Devolução: ${returnDateText}</strong></p>
        `;
    } else {
        mensagemDiv.innerHTML = `
        <span class="material-icons-outlined">notifications_active</span>
        <p>Você não possui nenhum livro reservado</p>
        `;
    }
}


    btnFinalizar.addEventListener('click', () => {
      if (carrinho.length === 0) {
        alert("Adicione livros ao carrinho antes de finalizar.");
        return;
      }
      modal.classList.remove('hidden');
    });

    btnCancelar.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    btnEsvaziar.addEventListener('click', () => { 
      alert("Carrinho esvaziado");
      carrinho = [];
      atualizarCarrinho();
      modal.classList.add('hidden');
    });

    btnConfirmar.addEventListener('click', () => {
      alert("Empréstimo confirmado! Compareça à biblioteca para retirada. Data de devolução: ");
      atualizarDados();
      carrinho = [];
      atualizarCarrinho();
      modal.classList.add('hidden');
    });