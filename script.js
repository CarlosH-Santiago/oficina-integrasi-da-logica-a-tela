// Função ativada pelo botão no HTML
async function acionarBusca() {
    const input = document.getElementById("inputNome").value;
    const divResultado = document.getElementById("resultado");
    
    // Validação de segurança: não pesquisar vazio
    if (input === "") {
        alert("Por favor, digite um nome de usuário!");
        return; 
    }

    try {
        // Lógica de Espera (Aguardando o Garçom/API)
        const resposta = await fetch(`https://api.github.com/users/${input}`);

        // Lógica Condicional (O que fazer se o usuário não existir?)
        if (!resposta.ok) {
            throw new Error("Dev não encontrado! Verifique o nome.");
        }

        // Convertendo a resposta em formato JSON
        const dados = await resposta.json();
        
        console.log("Dados recebidos da API:", dados); // Para mostrar no F12 da turma

        // Mapeamento: Injetando os dados do JSON nas tags HTML
        document.getElementById("fotoPerfil").src = dados.avatar_url;
        document.getElementById("nomeTela").innerText = dados.name || dados.login;
        document.getElementById("bioTela").innerText = dados.bio || "Usuário sem bio.";
        document.getElementById("reposTela").innerText = dados.public_repos;
        document.getElementById("seguidoresTela").innerText = dados.followers;

        // Exibe o card na tela
        divResultado.style.display = "block";

    } catch (erro) {
        // Lógica de Falha
        alert(erro.message);
        divResultado.style.display = "none";
    }
}
