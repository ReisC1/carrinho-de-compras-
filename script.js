// pega os produtos salvos no localStorage, se nao tiver nada comeca vazio
let produtos = JSON.parse(
    localStorage.getItem("produtos")
) || [];

function cadastrarProduto(evento) {
    evento.preventDefault();

    let nome = document.getElementById("nome").value;
    let preco = Number(document.getElementById("preco").value);

    // validacao
    if (nome.trim() == "") {
        alert("Digite o nome do produto!");
        return;
    }

    if (preco <= 0) {
        alert("O valor tem que ser maior que zero!");
        return;
    }

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

    mostrarProdutos();
}

function mostrarProdutos() {
    let lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    let total = 0;

    for (let produto of produtos) {
        let item = document.createElement("li");
        item.textContent = produto.nome + " - R$ " + produto.preco.toFixed(2);
        lista.appendChild(item);

        total = total + produto.preco;
    }

    document.getElementById("total").textContent = total.toFixed(2);
}

document.getElementById("formProduto")
    .addEventListener("submit", cadastrarProduto);

// mostra os produtos quando abre a pagina
mostrarProdutos();
