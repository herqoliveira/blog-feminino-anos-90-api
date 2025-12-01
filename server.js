const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Arquivo onde vamos salvar os posts
const CAMINHO = "./posts.json";

// Função: carregar posts
function carregarPosts() {
    try {
        const dados = fs.readFileSync(CAMINHO, "utf8");
        return JSON.parse(dados);
    } catch (erro) {
        return [];
    }
}

// Função: salvar posts
function salvarPosts(posts) {
    fs.writeFileSync(CAMINHO, JSON.stringify(posts, null, 2));
}

// --- Rota: listar posts ---
app.get("/posts", (req, res) => {
    const posts = carregarPosts();
    res.json(posts);
});

// --- Rota: criar novo post ---
app.post("/posts", (req, res) => {
    const posts = carregarPosts();

    const novoPost = {
        id: Date.now(),
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        autor: "Jéssica",
        data: new Date().toLocaleString()
    };

    posts.unshift(novoPost); // adiciona no topo
    salvarPosts(posts);

    res.json({ status: "ok", post: novoPost });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor da API está rodando!");
});
