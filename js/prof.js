function toggleMenu() {
    var menu = document.querySelector("nav ul");
    menu.classList.toggle("active");
}
// Carrega dados dos profissionais do LocalStorage
function carregarProfissionais() {
    return JSON.parse(localStorage.getItem('profissionais')) || [];
  }
  
  // Salva dados dos profissionais no LocalStorage
  function salvarProfissionais(profissionais) {
    localStorage.setItem('profissionais', JSON.stringify(profissionais));
  }
  
  // Função para buscar profissionais por localização
  function buscarProfissionais() {
    const location = document.getElementById("location").value;
    const listaProfissionais = document.getElementById("professional-list");
    listaProfissionais.innerHTML = "";
  
    const profissionais = carregarProfissionais();
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
          <button onclick="abrirChat('${profissional.nome}')">Chat</button>
        `;
        listaProfissionais.appendChild(card);
      });
    }
  }
  
  // Função para cadastrar novo profissional
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
    const novoProfissional = { id: profissionais.length + 1, nome, localizacao, preco, imagem };
    profissionais.push(novoProfissional);
    salvarProfissionais(profissionais);
  
    alert("Profissional cadastrado com sucesso!");
    document.getElementById("registration-form").reset();
    window.location.href = "index.html";
  }
  
  // Funções simuladas
  function marcarHorario(nome) {
    alert(`Horário marcado com ${nome}!`);
  }
  
  // Função para abrir o chat com o profissional selecionado
  function abrirChat(nome) {
    document.getElementById("chat-section").style.display = "block";
    document.getElementById("professional-name").innerText = nome;
  
    const mensagens = JSON.parse(localStorage.getItem(`chat_${nome}`)) || [];
    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML = "";
    mensagens.forEach(msg => {
      const messageElement = document.createElement("p");
      messageElement.innerText = msg;
      messagesContainer.appendChild(messageElement);
    });
  }
  
  // Função para enviar mensagem no chat
  function enviarMensagem() {
    const professionalName = document.getElementById("professional-name").innerText;
    const messageInput = document.getElementById("message-input");
    const mensagem = messageInput.value;
  
    if (mensagem) {
      const messagesContainer = document.getElementById("messages");
      const messageElement = document.createElement("p");
      messageElement.innerText = `Você: ${mensagem}`;
      messagesContainer.appendChild(messageElement);
  
      // Salva a mensagem no LocalStorage
      const mensagens = JSON.parse(localStorage.getItem(`chat_${professionalName}`)) || [];
      mensagens.push(`Você: ${mensagem}`);
      localStorage.setItem(`chat_${professionalName}`, JSON.stringify(mensagens));
  
      // Limpa o campo de mensagem
      messageInput.value = "";
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
  
  // Função para fechar o chat
  function fecharChat() {
    document.getElementById("chat-section").style.display = "none";
    document.getElementById("message-input").value = "";
  }
  
  // Carrega profissionais ao abrir a página
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("professional-list")) {
      buscarProfissionais();
    }
  });
  