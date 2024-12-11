// Função para carregar os itens do carrinho
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

// Inicializa a página do carrinho
document.addEventListener('DOMContentLoaded', function() {
    carregarCarrinho();

    const modal = document.getElementById('modal-pedido');
    const iniciarPedidoBtn = document.getElementById('iniciar-pedido');
    const fecharModal = document.querySelector('.fechar-modal');
    const confirmarPedidoBtn = document.getElementById('confirmar-pedido');
    const dinheiro = document.getElementById('dinheiro');
    const trocoGroup = document.querySelector('.troco-group');
    const pixRadio = document.getElementById('pix');
    const pixQRCode = document.querySelector('.pix-qrcode');

    // Abre o modal
    iniciarPedidoBtn.addEventListener('click', () => {
        const items = JSON.parse(localStorage.getItem('carrinhoItems')) || [];
        if (items.length === 0) {
            alert('Adicione itens ao carrinho antes de finalizar o pedido');
            return;
        }
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Fecha o modal
    fecharModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Fecha o modal se clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Controle do campo de troco
    dinheiro.addEventListener('change', function() {
        trocoGroup.style.display = this.checked ? 'flex' : 'none';
    });

    // Validação e envio do pedido
    confirmarPedidoBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const form = document.getElementById('form-entrega');
        if (!form.checkValidity()) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked');
        if (!pagamentoSelecionado) {
            alert('Selecione uma forma de pagamento');
            return;
        }

        if (pagamentoSelecionado.value === 'dinheiro' && trocoGroup.style.display !== 'none') {
            const trocoValor = document.getElementById('troco').value;
            const total = parseFloat(document.getElementById('valor-total').textContent);
            
            if (!trocoValor) {
                alert('Por favor, informe o valor para troco');
                return;
            }
            
            if (parseFloat(trocoValor) < total) {
                alert('O valor para troco deve ser maior que o total do pedido');
                return;
            }
        }

        // Coleta os dados do formulário
        const dadosPedido = {
            cliente: {
                nome: document.getElementById('nome').value,
                telefone: document.getElementById('telefone').value,
                endereco: document.getElementById('endereco').value,
                numero: document.getElementById('numero').value,
                complemento: document.getElementById('complemento').value,
                bairro: document.getElementById('bairro').value,
                referencia: document.getElementById('referencia').value
            },
            pagamento: {
                forma: pagamentoSelecionado.value,
                troco: pagamentoSelecionado.value === 'dinheiro' ? document.getElementById('troco').value : null
            },
            items: JSON.parse(localStorage.getItem('carrinhoItems')) || [],
            total: document.getElementById('valor-total').textContent
        };

        // Aqui você pode enviar os dados para seu backend
        console.log('Dados do pedido:', dadosPedido);

        // Finaliza o pedido
        alert('Pedido realizado com sucesso! Em breve entraremos em contato.');
        localStorage.removeItem('carrinhoItems');
        window.location.href = 'index.html';
    });

    // Controle da exibição do QR Code do PIX
    document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Esconde o QR Code se não for PIX
            if (pixQRCode) {
                pixQRCode.style.display = this.id === 'pix' ? 'block' : 'none';
            }
            // Esconde o campo de troco se não for dinheiro
            if (trocoGroup) {
                trocoGroup.style.display = this.id === 'dinheiro' ? 'flex' : 'none';
            }
        });
    });
}); 