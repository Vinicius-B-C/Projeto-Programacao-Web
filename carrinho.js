// Função para carregar os itens do localStorage
function carregarCarrinho() {
    const carrinhoItems = document.getElementById('carrinho-items');
    const valorTotal = document.getElementById('valor-total');
    
    // Recupera os itens do localStorage
    const items = JSON.parse(localStorage.getItem('carrinhoItems')) || [];
    
    if (items.length === 0) {
        carrinhoItems.innerHTML = `
            <div class="carrinho-vazio">
                <h2>Seu carrinho está vazio</h2>
                <p>Volte ao cardápio para adicionar itens</p>
            </div>
        `;
        valorTotal.textContent = '0.00';
        return;
    }
    
    // Limpa o conteúdo atual
    carrinhoItems.innerHTML = '';
    
    // Calcula o total
    let total = 0;
    
    // Adiciona cada item ao carrinho
    items.forEach((item, index) => {
        total += item.preco;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'carrinho-item';
        itemElement.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="carrinho-item-info">
                <h3>${item.nome}</h3>
                <p>R$ ${item.preco.toFixed(2)}</p>
            </div>
            <button class="remover-item" data-index="${index}">Remover</button>
        `;
        
        carrinhoItems.appendChild(itemElement);
    });
    
    // Atualiza o total
    valorTotal.textContent = total.toFixed(2);
    
    // Adiciona eventos aos botões de remover
    document.querySelectorAll('.remover-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            items.splice(index, 1);
            localStorage.setItem('carrinhoItems', JSON.stringify(items));
            carregarCarrinho();
        });
    });
}

// Adiciona evento ao botão de finalizar pedido
document.getElementById('finalizar-pedido').addEventListener('click', () => {
    const items = JSON.parse(localStorage.getItem('carrinhoItems')) || [];
    if (items.length === 0) {
        alert('Adicione itens ao carrinho antes de finalizar o pedido');
        return;
    }
    
    alert('Pedido finalizado com sucesso!');
    localStorage.removeItem('carrinhoItems');
    window.location.href = 'index.html';
});

// Carrega o carrinho quando a página é aberta
document.addEventListener('DOMContentLoaded', carregarCarrinho); 