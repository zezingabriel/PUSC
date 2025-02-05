function toggleMenu() {
    var menu = document.querySelector("nav ul");
    menu.classList.toggle("active");
}
// Função para carregar dados de profissionais do LocalStorage
function carregarProfissionais() {
    return JSON.parse(localStorage.getItem('profissionais')) || [];
  }
  
  // Função para salvar dados de profissionais no LocalStorage
  function salvarProfissionais(profissionais) {
    localStorage.setItem('profissionais', JSON.stringify(profissionais));
  }
  
  // Função para buscar profissionais com base na localização
  function buscarProfissionais() {
    const location = document.getElementById("location").value;
    const listaProfissionais = document.getElementById("professional-list");
  
    // Limpa lista atual
    listaProfissionais.innerHTML = "";
  
    // Carrega profissionais do LocalStorage
    const profissionais = carregarProfissionais();
  
    // Filtra profissionais pela localização inserida
    const proximos = profissionais.filter(profissional => profissional.localizacao.toLowerCase() === location.toLowerCase());
  
    if (proximos.length === 0) {
      listaProfissionais.innerHTML = "<p>Nenhum profissional encontrado para essa localização.</p>";
    } else {
      proximos.forEach(profissional => {
        const card = document.createElement("div");
        card.className = "professional";
        card.innerHTML = `
          <img src="${profissional.imagem || 'https://via.placeholder.com/100'}" alt="Foto de ${profissional.nome}">
          <h3>${profissional.nome}</h3>
          <p>Localização: ${profissional.localizacao}</p>
          <p>Preço: R$${profissional.preco},00</p>
          <button onclick="marcarHorario('${profissional.nome}')">Marcar Horário</button>
          <button onclick="iniciarChat('${profissional.nome}')">Chat</button>
        `;
        listaProfissionais.appendChild(card);
      });
    }
  }
  
  // Função para cadastrar um novo profissional na página de cadastro
  function cadastrarProfissional() {
    const nome = document.getElementById("name").value;
    const localizacao = document.getElementById("location").value;
    const preco = parseFloat(document.getElementById("price").value);
    const imagem = document.getElementById("photo").value || "https://via.placeholder.com/100";
  
    if (preco < 50) {
      alert("O preço mínimo é R$50,00.");
      return;
    }
  
    const profissionais = carregarProfissionais();
    const novoProfissional = {
      id: profissionais.length + 1,
      nome,
      localizacao,
      preco,
      imagem
    };
  
    profissionais.push(novoProfissional);
    salvarProfissionais(profissionais);
  
    alert("Profissional cadastrado com sucesso!");
  
    // Limpa o formulário
    document.getElementById("registration-form").reset();
  
    // Redireciona para a página principal
    window.location.href = "index.html";
  }
  
  // Funções simuladas para marcar horário e iniciar chat
  function marcarHorario(nome) {
    alert(`Horário marcado com ${nome}!`);
  }
  
  function iniciarChat(nome) {
    alert(`Iniciando chat com ${nome}!`);
  }
  
  // Carrega profissionais na página principal
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("professional-list")) {
      buscarProfissionais();
    }
  });  