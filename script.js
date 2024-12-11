// Adicione este código no início do seu arquivo script.js
document.addEventListener('DOMContentLoaded', function() {
    const dropBtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const btnTopo = document.getElementById('btn-topo');

    // Toggle do dropdown ao clicar
    dropBtn.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownContent.classList.toggle('show');
    });

    // Fecha o dropdown se clicar fora dele
    window.addEventListener('click', function(e) {
        if (!e.target.matches('.dropbtn')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });

    // Fecha o dropdown após clicar em um link
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function() {
            dropdownContent.classList.remove('show');
        });
    });

    // Função para mostrar notificação de item adicionado
    function mostrarNotificacao(nomeProduto, preco) {
        const notificacao = document.createElement('div');
        notificacao.className = 'notificacao-carrinho';
        notificacao.innerHTML = `
            <p>✅ ${nomeProduto}</p>
            <p>Adicionado ao carrinho!</p>
            <p>R$ ${preco.toFixed(2)}</p>
        `;
        
        document.body.appendChild(notificacao);
        
        // Remove a notificação após 3 segundos
        setTimeout(() => {
            notificacao.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notificacao);
            }, 300);
        }, 2000);
    }

    // Modifica o evento de click dos botões para adicionar ao carrinho
    document.querySelectorAll('.btn-pedido').forEach(button => {
        button.addEventListener('click', () => {
            const article = button.closest('article');
            const preco = parseFloat(button.getAttribute('data-preco'));
            const nomeProduto = article.querySelector('h2').textContent;
            const imagem = article.querySelector('img').src;
            
            // Recupera itens existentes ou cria array vazio
            const carrinhoItems = JSON.parse(localStorage.getItem('carrinhoItems')) || [];
            
            // Adiciona novo item
            carrinhoItems.push({
                nome: nomeProduto,
                preco: preco,
                imagem: imagem
            });
            
            // Salva no localStorage
            localStorage.setItem('carrinhoItems', JSON.stringify(carrinhoItems));
            
            // Atualiza o contador
            document.getElementById('carrinho-contador').textContent = carrinhoItems.length;
            
            // Mostra a notificação
            mostrarNotificacao(nomeProduto, preco);
            
            // Adiciona efeito de clique no botão
            button.classList.add('btn-clicked');
            setTimeout(() => {
                button.classList.remove('btn-clicked');
            }, 200);
        });
    });

    // Carrega o contador ao iniciar a página
    const carrinhoItems = JSON.parse(localStorage.getItem('carrinhoItems')) || [];
    document.getElementById('carrinho-contador').textContent = carrinhoItems.length;

    // Mostra ou oculta o botão baseado na posição do scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btnTopo.style.display = 'flex';
        } else {
            btnTopo.style.display = 'none';
        }
    });

    // Evento de clique para voltar ao topo
    btnTopo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Modifica o link do carrinho para ir para a página do carrinho
document.getElementById('carrinho-icon').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'carrinho.html';
});