// ===== CONFIGURAÇÃO GLOBAL DO CHART.JS =====
Chart.defaults.global = Chart.defaults.global || {};
Chart.defaults.global.defaultFontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// ===== VARIÁVEIS GLOBAIS =====
let vendasChart, produtosChart;
let dadosVendas = {
    labels: [],
    datasets: [{
        label: 'Vendas (€)',
        data: [],
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

let dadosProdutos = {
    labels: [],
    datasets: [{
        data: [],
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

// ===== FUNÇÕES DA API =====
async function fetchSalesData() {
    try {
        const response = await fetch('/api/sales');
        const result = await response.json();
        
        if (result.success) {
            const labels = result.data.map(item => item.month);
            const data = result.data.map(item => item.amount);
            
            dadosVendas.labels = labels;
            dadosVendas.datasets[0].data = data;
            
            return result.data;
        } else {
            throw new Error(result.error || 'Erro ao carregar dados de vendas');
        }
    } catch (error) {
        console.error('Erro ao buscar dados de vendas:', error);
        mostrarNotificacao('Erro ao carregar dados de vendas', 'error');
        return null;
    }
}

async function fetchProductMetrics() {
    try {
        const response = await fetch('/api/products/metrics');
        const result = await response.json();
        
        if (result.success) {
            const labels = result.data.map(item => item.category);
            const data = result.data.map(item => item.percentage);
            
            dadosProdutos.labels = labels;
            dadosProdutos.datasets[0].data = data;
            
            return result.data;
        } else {
            throw new Error(result.error || 'Erro ao carregar métricas de produtos');
        }
    } catch (error) {
        console.error('Erro ao buscar métricas de produtos:', error);
        mostrarNotificacao('Erro ao carregar métricas de produtos', 'error');
        return null;
    }
}

async function fetchUserData() {
    try {
        const response = await fetch('/api/users');
        const result = await response.json();
        
        if (result.success) {
            return result.data;
        } else {
            throw new Error(result.error || 'Erro ao carregar dados de utilizadores');
        }
    } catch (error) {
        console.error('Erro ao buscar dados de utilizadores:', error);
        mostrarNotificacao('Erro ao carregar dados de utilizadores', 'error');
        return null;
    }
}

async function fetchRecentActivity() {
    try {
        const response = await fetch('/api/recent-activity');
        const result = await response.json();
        
        if (result.success) {
            return result.data;
        } else {
            throw new Error(result.error || 'Erro ao carregar atividade recente');
        }
    } catch (error) {
        console.error('Erro ao buscar atividade recente:', error);
        mostrarNotificacao('Erro ao carregar atividade recente', 'error');
        return null;
    }
}

async function refreshAllData() {
    try {
        const response = await fetch('/api/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Recarregar todos os dados
            await carregarDadosIniciais();
            mostrarNotificacao('Dados atualizados com sucesso!', 'success');
        } else {
            throw new Error(result.error || 'Erro ao atualizar dados');
        }
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        mostrarNotificacao('Erro ao atualizar dados', 'error');
    }
}

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

// ===== ATUALIZAÇÃO DOS KPIS =====
function atualizarKPIs(userData) {
    if (!userData) return;
    
    // Calcular vendas totais baseado nos dados de vendas
    const totalVendas = dadosVendas.datasets[0].data.reduce((sum, value) => sum + value, 0);
    
    const elementos = [
        { id: 'vendas-totais', valor: totalVendas, prefixo: '€', sufixo: '' },
        { id: 'total-pedidos', valor: userData.total_orders, prefixo: '', sufixo: '' },
        { id: 'taxa-conversao', valor: userData.conversion_rate, prefixo: '', sufixo: '%' },
        { id: 'produtos-ativos', valor: userData.active_products, prefixo: '', sufixo: '' }
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

// ===== ATUALIZAÇÃO DA TABELA DE ATIVIDADE RECENTE =====
function atualizarTabelaAtividade(activities) {
    if (!activities || activities.length === 0) return;
    
    const tbody = document.querySelector('#dataTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    activities.forEach(activity => {
        const row = document.createElement('tr');
        
        const statusClass = activity.status === 'Concluído' ? 'success' : 
                           activity.status === 'Processando' ? 'warning' : 'danger';
        
        row.innerHTML = `
            <td>${activity.order_id}</td>
            <td>${activity.customer_name}</td>
            <td>${activity.product}</td>
            <td>€${activity.amount.toFixed(2)}</td>
            <td><span class="badge bg-${statusClass}">${activity.status}</span></td>
            <td>${new Date(activity.order_date).toLocaleDateString('pt-PT')}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// ===== CARREGAMENTO INICIAL DOS DADOS =====
async function carregarDadosIniciais() {
    try {
        mostrarLoading();
        
        // Carregar todos os dados em paralelo
        const [salesData, productMetrics, userData, recentActivity] = await Promise.all([
            fetchSalesData(),
            fetchProductMetrics(),
            fetchUserData(),
            fetchRecentActivity()
        ]);
        
        // Atualizar gráficos
        if (vendasChart && salesData) {
            vendasChart.update('active');
        }
        
        if (produtosChart && productMetrics) {
            produtosChart.update('active');
        }
        
        // Atualizar KPIs
        if (userData) {
            atualizarKPIs(userData);
        }
        
        // Atualizar tabela de atividade
        if (recentActivity) {
            atualizarTabelaAtividade(recentActivity);
        }
        
        esconderLoading();
        
    } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
        mostrarNotificacao('Erro ao carregar dados do dashboard', 'error');
        esconderLoading();
    }
}

// ===== FUNCIONALIDADES INTERATIVAS =====
function adicionarEventListeners() {
    // Botão de atualizar
    const btnAtualizar = document.querySelector('.btn-primary');
    if (btnAtualizar) {
        btnAtualizar.addEventListener('click', async function(e) {
            e.preventDefault();
            await refreshAllData();
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
    notificacao.className = `alert alert-${tipo === 'error' ? 'danger' : tipo === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
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
document.addEventListener('DOMContentLoaded', async function() {
    console.log('FastTrack Dashboard carregado com sucesso!');
    
    // Inicializar componentes
    inicializarGraficos();
    adicionarEventListeners();
    ajustarGraficosResponsivos();
    
    // Carregar dados da API
    await carregarDadosIniciais();
    
    // Mostrar notificação de boas-vindas
    setTimeout(() => {
        mostrarNotificacao('Bem-vindo ao FastTrack Dashboard!', 'success');
    }, 1000);
});

// ===== ESTILOS CSS PARA LOADING =====
const style = document.createElement('style');
style.textContent = `
    .card.loading {
        opacity: 0.7;
        pointer-events: none;
        position: relative;
    }
    
    .card.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #4e73df;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

