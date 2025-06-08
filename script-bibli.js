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

document.addEventListener('DOMContentLoaded', () => {
  const livrosPorPagina = 3;
  let paginaAtual = 1;
  let todosLivros = [];
  let livrosFiltrados = [];

  const container = document.getElementById('lista-livros');
  const barraPesquisa = document.getElementById('barra-pesquisa');

 function mostrarLivrosPagina(pagina) {
  container.innerHTML = '';

  const inicio = (pagina - 1) * livrosPorPagina;
  const fim = inicio + livrosPorPagina;
  const livrosPagina = livrosFiltrados.slice(inicio, fim);

  livrosPagina.forEach(livro => {
    const div = document.createElement('div');
    div.className = 'livro';
    div.dataset.titulo = livro.titulo;

    const status = livro.disponivel ? 'Disponível' : 'Indisponível';
    const statusClass = livro.disponivel ? 'disponivel' : 'indisponivel';

    div.innerHTML = `
      <h3><strong>${livro.titulo}</strong></h3>
      <p>Status: <span class="${statusClass}">${status}</span></p>
      <button class="adicionar-carrinho" ${!livro.disponivel ? 'disabled' : ''}>
        ${livro.disponivel ? 'Adicionar ao carrinho' : 'Indisponível'}
      </button>
    `;

    container.appendChild(div);
  });

  // Agora adiciona o event listener para os botões criados
  const botoesAdicionar = container.querySelectorAll('.adicionar-carrinho');
  botoesAdicionar.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const livroSelecionado = livrosPagina[index];
      if (!carrinho.includes(livroSelecionado.titulo)) {
        carrinho.push(livroSelecionado.titulo);
        atualizarCarrinho();
        atualizarDados();
      } else {
        alert('Livro já está no carrinho.');
      }
    });
  });

  atualizarBotoes();
}
  function atualizarBotoes() {
    btnAnterior.disabled = paginaAtual === 1;
    btnProximo.disabled = paginaAtual === Math.ceil(livrosFiltrados.length / livrosPorPagina);
  }

  function filtrarLivros(termo) {
    livrosFiltrados = todosLivros.filter(livro =>
      livro.titulo.toLowerCase().includes(termo.toLowerCase())
    );
    paginaAtual = 1;
    mostrarLivrosPagina(paginaAtual);
  }

  const btnAnterior = document.createElement('button');
  btnAnterior.textContent = 'Anterior';
  btnAnterior.addEventListener('click', () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      mostrarLivrosPagina(paginaAtual);
    }
  });

  const btnProximo = document.createElement('button');
  btnProximo.textContent = 'Próximo';
  btnProximo.addEventListener('click', () => {
    if (paginaAtual < Math.ceil(livrosFiltrados.length / livrosPorPagina)) {
      paginaAtual++;
      mostrarLivrosPagina(paginaAtual);
    }
  });

  const divBotoes = document.createElement('div');
  divBotoes.className = 'paginacao-botoes';

  divBotoes.appendChild(btnAnterior);
  divBotoes.appendChild(btnProximo);

  container.parentNode.appendChild(divBotoes);

  fetch('livros.json')
    .then(res => res.json())
    .then(livros => {
      todosLivros = livros;
      livrosFiltrados = livros; // inicialmente todos
      mostrarLivrosPagina(paginaAtual);
    })
    .catch(err => {
      container.innerHTML = 'Erro ao carregar os livros.';
      console.error(err);
    });

  barraPesquisa.addEventListener('input', () => {
    const termo = barraPesquisa.value;
    filtrarLivros(termo);
  });
});

  
function atualizarCarrinho() {
  const listaCarrinho = document.getElementById('lista-carrinho');
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