let produtos = JSON.parse(
    localStorage.getItem("produtos")
) || [];

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarErro(campo, texto) {
    document.getElementById("mensagem").textContent = texto;
    campo.setAttribute("aria-invalid", "true");
    campo.focus();
}

function cadastrarProduto(evento) {
    evento.preventDefault();

    let campoNome = document.getElementById("nome");
    let campoPreco = document.getElementById("preco");

    let nome = campoNome.value.trim();
    let preco = Number(campoPreco.value);

    campoNome.removeAttribute("aria-invalid");
    campoPreco.removeAttribute("aria-invalid");

    if (nome === "") {
        mostrarErro(campoNome, "Informe o nome do produto.");
        return;
    }

    if (isNaN(preco) || preco <= 0) {
        mostrarErro(campoPreco, "Informe um valor maior que zero.");
        return;
    }

    document.getElementById("mensagem").textContent = "";

    let produto = {
        nome: nome,
        preco: preco
    };

    produtos.push(produto);

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

    document.getElementById("formProduto").reset();
    campoNome.focus();

    mostrarProdutos(true);
}

function mostrarProdutos(destacarUltimo) {
    let lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    let total = 0;

    if (produtos.length === 0) {
        let item = document.createElement("li");
        item.className = "vazio";
        item.textContent = "Seu carrinho está vazio. Adicione um produto pelo formulário.";
        lista.appendChild(item);
    }

    for (let produto of produtos) {
        let item = document.createElement("li");

        let nome = document.createElement("span");
        nome.textContent = produto.nome;

        let pontilhado = document.createElement("span");
        pontilhado.className = "pontilhado";

        let preco = document.createElement("span");
        preco.className = "preco";
        preco.textContent = formatarMoeda(produto.preco);

        item.appendChild(nome);
        item.appendChild(pontilhado);
        item.appendChild(preco);
        lista.appendChild(item);

        total = total + produto.preco;
    }

    if (destacarUltimo) {
        lista.lastChild.classList.add("novo");
    }

    let quantidade = produtos.length;
    document.getElementById("quantidade").textContent =
        quantidade + (quantidade === 1 ? " item" : " itens");

    document.getElementById("total").textContent = formatarMoeda(total);
}

document.getElementById("formProduto")
    .addEventListener("submit", cadastrarProduto);

document.getElementById("data").textContent =
    new Date().toLocaleDateString("pt-BR");

mostrarProdutos(false);