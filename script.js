// Adicione este código no início do seu arquivo script.js
document.addEventListener('DOMContentLoaded', function() {
    const dropBtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

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
});

// Modifica o evento de click dos botões para adicionar ao carrinho
document.querySelectorAll('.btn-pedido').forEach(button => {
    button.addEventListener('click', () => {
        const preco = parseFloat(button.getAttribute('data-preco'));
        const article = button.parentElement;
        const nomeLanche = article.querySelector('h2').textContent;
        const imagem = article.querySelector('img').src;
        
        // Recupera itens existentes ou cria array vazio
        const carrinhoItems = JSON.parse(localStorage.getItem('carrinhoItems')) || [];
        
        // Adiciona novo item
        carrinhoItems.push({
            nome: nomeLanche,
            preco: preco,
            imagem: imagem
        });
        
        // Salva no localStorage
        localStorage.setItem('carrinhoItems', JSON.stringify(carrinhoItems));
        
        // Atualiza o contador
        document.getElementById('carrinho-contador').textContent = carrinhoItems.length;
    });
});

// Carrega o contador ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    const carrinhoItems = JSON.parse(localStorage.getItem('carrinhoItems')) || [];
    document.getElementById('carrinho-contador').textContent = carrinhoItems.length;
});

// Modifica o link do carrinho para ir para a página do carrinho
document.getElementById('carrinho-icon').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'carrinho.html';
});