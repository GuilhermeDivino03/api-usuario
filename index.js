const express = require("express");
const server = express();

server.use(express.json());

// variavel para armazenar os dados do usuario na memoria de forma simplificada
let usuario = null;

server.get("/usuario", (req,res) => {
    console.log("usuario chamado");
    if (usuario) {
        console.log("Usuário encontrado:", usuario);
        res.json(usuario);
    } else {
        console.log("Nenhum usuário encontrado");
        res.status(404).json({ error: "Usuário não encontrado" });
    }
});


// Rota POST para receber informações do usuário
server.post("/usuario", (req, res) => {
    console.log("POST /usuario chamado");
    const { nome, sobrenome, idade, profissao } = req.body;
    if (!nome || !sobrenome || !idade || !profissao) {
        console.log("Dados incompletos fornecidos:", req.body);
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    // Armazena os dados do usuário em memória
    usuario = {
        nome,
        sobrenome,
        idade,
        profissao
    };
    console.log("Usuário armazenado:", usuario);
    res.status(201).json({
        message: "Usuário criado com sucesso",
        usuario
    });
});


server.listen(3000, () => {
    console.log("Servidor conectado")
});