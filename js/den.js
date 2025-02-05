document.getElementById('denunciaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const local = document.getElementById('local').value;
    const descricao = document.getElementById('descricao').value;

    fetch('http://localhost:3000/enviar-denuncia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, local, descricao }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('mensagem-sucesso').classList.remove('oculto');
            document.getElementById('denunciaForm').reset(); // Limpa o formulário
        } else {
            alert('Ocorreu um erro ao enviar sua denúncia. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Substituir por seu provedor de e-mail
    auth: {
        user: 'seu-email@gmail.com', // Coloque seu e-mail
        pass: 'sua-senha' // Coloque sua senha (ou App Password)
    }
});

// Rota para enviar a denúncia por e-mail
app.post('/enviar-denuncia', (req, res) => {
    const { nome, email, local, descricao } = req.body;

    const mailOptions = {
        from: email,
        to: 'orgao.responsavel@example.com', // E-mail do órgão responsável
        subject: `Denúncia de Maus-Tratos - Local: ${local}`,
        text: `
            Nome: ${nome}
            E-mail: ${email}
            Local: ${local}
            Descrição: ${descricao}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Erro ao enviar a denúncia.' });
        } else {
            return res.status(200).json({ success: true, message: 'Denúncia enviada com sucesso!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
var  cors  = require ( ' express-cors ' ) 
    aplicativo . usar ( cors ( {
        Origenspermitidas : [ 
            ' github.com ' , ' google.com ' 
    ]
} ) )