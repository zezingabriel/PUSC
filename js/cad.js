// Alterna entre os formulários de login e cadastro
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

// Função para cadastrar o usuário
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
        // Armazena as credenciais no localStorage
        localStorage.setItem('usuario', username);
        localStorage.setItem('senha', password);

        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        toggleForms(); // Alterna para o formulário de login
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para realizar o login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Recupera as credenciais armazenadas no localStorage
    const storedUsername = localStorage.getItem('usuario');
    const storedPassword = localStorage.getItem('senha');

    if (username === storedUsername && password === storedPassword) {
        alert('Login bem-sucedido!');
        localStorage.setItem('usuarioLogado', true); // Marca o usuário como logado
        window.location.href = 'index.html'; // Redireciona para a página inicial
    } else {
        alert('Usuário ou senha incorretos.');
    }
}
