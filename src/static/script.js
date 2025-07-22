// ===== CONFIGURAÇÃO GLOBAL DO CHART.JS =====
Chart.defaults.global = Chart.defaults.global || {};
Chart.defaults.global.defaultFontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// ===== DADOS PARA OS GRÁFICOS =====
const dadosVendas = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [{
        label: 'Vendas (€)',
        data: [32000, 28000, 35000, 42000, 38000, 45000, 48000, 52000, 47000, 51000, 49000, 45280],
        backgroundColor: 'rgba(78, 115, 223, 0.1)',
        borderColor: 'rgba(78, 115, 223, 1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(78, 115, 223, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
        pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderWidth: 2
    }]
};

const dadosProdutos = {
    labels: ['Eletrónicos', 'Roupas', 'Casa', 'Desporto', 'Livros'],
    datasets: [{
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
            'rgba(78, 115, 223, 0.8)',
            'rgba(28, 200, 138, 0.8)',
            'rgba(54, 185, 204, 0.8)',
            'rgba(246, 194, 62, 0.8)',
            'rgba(231, 74, 59, 0.8)'
        ],
        borderColor: [
            'rgba(78, 115, 223, 1)',
            'rgba(28, 200, 138, 1)',
            'rgba(54, 185, 204, 1)',
            'rgba(246, 194, 62, 1)',
            'rgba(231, 74, 59, 1)'
        ],
        borderWidth: 2,
        hoverOffset: 10
    }]
};

// ===== CONFIGURAÇÕES DOS GRÁFICOS =====
const configVendas = {
    type: 'line',
    data: dadosVendas,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#5a5c69',
                bodyColor: '#5a5c69',
                borderColor: '#dddfeb',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        return 'Vendas: €' + context.parsed.y.toLocaleString('pt-PT');
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#858796',
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                grid: {
                    color: '#eaecf4',
                    borderDash: [5, 5]
                },
                ticks: {
                    color: '#858796',
                    font: {
                        size: 12
                    },
                    callback: function(value) {
                        return '€' + (value / 1000) + 'k';
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    }
};

const configProdutos = {
    type: 'doughnut',
    data: dadosProdutos,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#5a5c69',
                bodyColor: '#5a5c69',
                borderColor: '#dddfeb',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.parsed + '%';
                    }
                }
            }
        },
        cutout: '60%',
        animation: {
            animateRotate: true,
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    }
};

// ===== INICIALIZAÇÃO DOS GRÁFICOS =====
let vendasChart, produtosChart;

function inicializarGraficos() {
    // Gráfico de Vendas
    const ctxVendas = document.getElementById('vendasChart');
    if (ctxVendas) {
        vendasChart = new Chart(ctxVendas, configVendas);
    }

    // Gráfico de Produtos
    const ctxProdutos = document.getElementById('produtosChart');
    if (ctxProdutos) {
        produtosChart = new Chart(ctxProdutos, configProdutos);
    }
}

// ===== ANIMAÇÃO DOS NÚMEROS DOS KPIS =====
function animarNumeros() {
    const elementos = [
        { id: 'vendas-totais', valor: 45280, prefixo: '€', sufixo: '' },
        { id: 'total-pedidos', valor: 1247, prefixo: '', sufixo: '' },
        { id: 'taxa-conversao', valor: 68, prefixo: '', sufixo: '%' },
        { id: 'produtos-ativos', valor: 342, prefixo: '', sufixo: '' }
    ];

    elementos.forEach(elemento => {
        const el = document.getElementById(elemento.id);
        if (el) {
            animarContador(el, elemento.valor, elemento.prefixo, elemento.sufixo);
        }
    });
}

function animarContador(elemento, valorFinal, prefixo = '', sufixo = '') {
    let valorAtual = 0;
    const incremento = valorFinal / 100;
    const duracao = 2000; // 2 segundos
    const intervalo = duracao / 100;

    const timer = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(timer);
        }
        
        let valorFormatado;
        if (valorFinal >= 1000) {
            valorFormatado = Math.floor(valorAtual).toLocaleString('pt-PT');
        } else {
            valorFormatado = Math.floor(valorAtual);
        }
        
        elemento.textContent = prefixo + valorFormatado + sufixo;
    }, intervalo);
}

// ===== FUNCIONALIDADES INTERATIVAS =====
function adicionarEventListeners() {
    // Botão de atualizar
    const btnAtualizar = document.querySelector('.btn-primary');
    if (btnAtualizar) {
        btnAtualizar.addEventListener('click', function(e) {
            e.preventDefault();
            atualizarDashboard();
        });
    }

    // Botão de exportar
    const btnExportar = document.querySelector('.btn-outline-primary');
    if (btnExportar) {
        btnExportar.addEventListener('click', function(e) {
            e.preventDefault();
            exportarDados();
        });
    }

    // Hover effects nos cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll para links da navbar
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== FUNÇÕES DE ATUALIZAÇÃO =====
function atualizarDashboard() {
    // Mostrar loading
    mostrarLoading();
    
    // Simular carregamento de dados
    setTimeout(() => {
        // Atualizar dados dos gráficos
        atualizarGraficos();
        
        // Atualizar KPIs
        atualizarKPIs();
        
        // Esconder loading
        esconderLoading();
        
        // Mostrar notificação
        mostrarNotificacao('Dashboard atualizado com sucesso!', 'success');
    }, 1500);
}

function atualizarGraficos() {
    // Gerar novos dados aleatórios para demonstração
    const novosDadosVendas = dadosVendas.datasets[0].data.map(valor => {
        const variacao = (Math.random() - 0.5) * 0.2; // ±10% de variação
        return Math.round(valor * (1 + variacao));
    });
    
    vendasChart.data.datasets[0].data = novosDadosVendas;
    vendasChart.update('active');
    
    // Atualizar gráfico de produtos
    const novosDadosProdutos = dadosProdutos.datasets[0].data.map(valor => {
        const variacao = (Math.random() - 0.5) * 0.3; // ±15% de variação
        return Math.max(1, Math.round(valor * (1 + variacao)));
    });
    
    produtosChart.data.datasets[0].data = novosDadosProdutos;
    produtosChart.update('active');
}

function atualizarKPIs() {
    // Simular novos valores de KPIs
    const novosValores = {
        'vendas-totais': Math.round(45280 * (1 + (Math.random() - 0.5) * 0.2)),
        'total-pedidos': Math.round(1247 * (1 + (Math.random() - 0.5) * 0.15)),
        'taxa-conversao': Math.round(68 * (1 + (Math.random() - 0.5) * 0.1)),
        'produtos-ativos': Math.round(342 * (1 + (Math.random() - 0.5) * 0.05))
    };
    
    Object.keys(novosValores).forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            const valor = novosValores[id];
            let prefixo = '', sufixo = '';
            
            if (id === 'vendas-totais') prefixo = '€';
            if (id === 'taxa-conversao') sufixo = '%';
            
            animarContador(elemento, valor, prefixo, sufixo);
        }
    });
}

// ===== FUNÇÕES AUXILIARES =====
function mostrarLoading() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('loading');
    });
}

function esconderLoading() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('loading');
    });
}

function mostrarNotificacao(mensagem, tipo = 'info') {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    notificacao.style.cssText = `
        top: 90px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    `;
    
    notificacao.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notificacao);
    
    // Remover automaticamente após 3 segundos
    setTimeout(() => {
        if (notificacao.parentNode) {
            notificacao.remove();
        }
    }, 3000);
}

function exportarDados() {
    mostrarNotificacao('Funcionalidade de exportação em desenvolvimento...', 'info');
}

// ===== RESPONSIVIDADE DOS GRÁFICOS =====
function ajustarGraficosResponsivos() {
    window.addEventListener('resize', function() {
        if (vendasChart) vendasChart.resize();
        if (produtosChart) produtosChart.resize();
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('FastTrack Dashboard carregado com sucesso!');
    
    // Inicializar componentes
    inicializarGraficos();
    animarNumeros();
    adicionarEventListeners();
    ajustarGraficosResponsivos();
    
    // Mostrar notificação de boas-vindas
    setTimeout(() => {
        mostrarNotificacao('Bem-vindo ao FastTrack Dashboard!', 'success');
    }, 1000);
});

// ===== DADOS PARA DEMONSTRAÇÃO =====
// Função para simular dados em tempo real (opcional)
function simularDadosTempoReal() {
    setInterval(() => {
        // Atualizar apenas alguns valores aleatoriamente
        if (Math.random() > 0.7) { // 30% de chance de atualização
            const elementoAleatorio = ['vendas-totais', 'total-pedidos'][Math.floor(Math.random() * 2)];
            const elemento = document.getElementById(elementoAleatorio);
            
            if (elemento) {
                const valorAtual = parseInt(elemento.textContent.replace(/[€%,]/g, ''));
                const novoValor = Math.round(valorAtual * (1 + (Math.random() - 0.5) * 0.02)); // ±1% de variação
                
                let prefixo = '', sufixo = '';
                if (elementoAleatorio === 'vendas-totais') prefixo = '€';
                
                animarContador(elemento, novoValor, prefixo, sufixo);
            }
        }
    }, 10000); // A cada 10 segundos
}

// Descomentar a linha abaixo para ativar simulação de dados em tempo real
// simularDadosTempoReal();

