// Função para simular o login de um usuário
function logarUsuario(usuario) {
    // Suponha que 'usuario' seja um objeto com informações do usuário, por exemplo, { id: 1, nome: "João" }
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario)); // Armazena o usuário como uma string JSON
    alert("Usuário logado com sucesso!");
}
// Função para verificar se o usuário tem uma conta
function verificarConta() {
    const temConta = verificarSeUsuarioTemConta(); // Verifica se o usuário está logado

    if (!temConta) {
        // Se o usuário não estiver logado, redireciona para a página de cadastro
        window.location.href = "cad.html";
    } else {
        // Se o usuário está logado, pode executar alguma ação, como exibir uma mensagem de boas-vindas
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")); // Recupera o objeto do usuário logado
        alert(`Bem-vindo de volta, ${usuarioLogado.nome}!`);
    }
}

// Função para verificar a existência de um usuário logado
function verificarSeUsuarioTemConta() {
    // Verifica se existe a chave "usuarioLogado" no localStorage
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    // Retorna true se a chave existe e não está vazia, caso contrário, retorna false
    return usuarioLogado !== null;
}
// Função para deslogar o usuário
function deslogarUsuario() {
    localStorage.removeItem("usuarioLogado"); // Remove os dados do usuário do localStorage
    alert("Usuário deslogado com sucesso!");
    window.location.href = "login.html"; // Redireciona para a página de login
}
