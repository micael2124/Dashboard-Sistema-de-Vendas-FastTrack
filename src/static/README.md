# FastTrack Dashboard - Sistema de Vendas

## 📊 Descrição do Projeto

O **FastTrack Dashboard** é uma interface administrativa moderna e responsiva para controlo interno de vendas e produtos. Este dashboard oferece uma visão abrangente do desempenho das vendas através de gráficos dinâmicos, cards com KPIs e um layout fluido que se adapta a diferentes dispositivos.

## ✨ Funcionalidades

### 📈 Gráficos Dinâmicos
- **Gráfico de Vendas por Mês**: Visualização das vendas mensais com animações suaves
- **Gráfico de Produtos Mais Vendidos**: Gráfico circular (doughnut) mostrando a distribuição por categorias
- **Atualização em Tempo Real**: Botão para atualizar dados com animações

### 📊 KPIs (Key Performance Indicators)
- **Vendas Totais Mensais**: Valor total de vendas com comparação percentual
- **Total de Pedidos**: Número de pedidos processados
- **Taxa de Conversão**: Percentagem de conversão com barra de progresso
- **Produtos Ativos**: Número de produtos disponíveis no catálogo

### 🎨 Interface Moderna
- **Design Responsivo**: Adaptação automática para desktop, tablet e mobile
- **Animações Suaves**: Transições e micro-interações elegantes
- **Cores Consistentes**: Paleta de cores profissional e harmoniosa
- **Tipografia Moderna**: Fonte Inter para melhor legibilidade

### 📱 Responsividade
- **Mobile-First**: Otimizado para dispositivos móveis
- **Breakpoints Inteligentes**: Adaptação fluida entre diferentes tamanhos de ecrã
- **Touch-Friendly**: Elementos interativos otimizados para toque

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com variáveis CSS e animações
- **JavaScript ES6+**: Funcionalidades interativas e manipulação de dados
- **Bootstrap 5.3**: Framework CSS para layout responsivo
- **Chart.js**: Biblioteca para criação de gráficos dinâmicos
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia Inter

## 📁 Estrutura do Projeto

```
FastTrack_Dashboard/
├── index.html          # Página principal do dashboard
├── style.css           # Estilos personalizados
├── script.js           # Funcionalidades JavaScript
├── README.md           # Documentação do projeto
└── todo.md             # Lista de tarefas do desenvolvimento
```

## 🚀 Como Executar

### Método 1: Abertura Direta
1. Faça o download de todos os ficheiros do projeto
2. Abra o ficheiro `index.html` no seu navegador web
3. O dashboard será carregado automaticamente

### Método 2: Servidor Local (Recomendado)
1. Instale um servidor web local (ex: Live Server no VS Code)
2. Abra a pasta do projeto no seu editor
3. Inicie o servidor local
4. Aceda ao dashboard através do endereço fornecido

## 🎯 Funcionalidades Interativas

### Botões de Ação
- **Atualizar**: Simula a atualização dos dados com novos valores aleatórios
- **Exportar**: Placeholder para funcionalidade de exportação de dados

### Navegação
- **Menu Responsivo**: Navegação adaptável com dropdown para utilizador
- **Links Suaves**: Scroll suave entre secções (quando implementadas)

### Notificações
- **Feedback Visual**: Notificações de sucesso e informação
- **Loading States**: Indicadores de carregamento durante atualizações

## 📊 Dados de Demonstração

O dashboard inclui dados fictícios para demonstração:

### Vendas Mensais (€)
- Janeiro: €32.000
- Fevereiro: €28.000
- Março: €35.000
- Abril: €42.000
- Maio: €38.000
- Junho: €45.000
- Julho: €48.000
- Agosto: €52.000
- Setembro: €47.000
- Outubro: €51.000
- Novembro: €49.000
- Dezembro: €45.280

### Distribuição de Produtos
- Eletrónicos: 35%
- Roupas: 25%
- Casa: 20%
- Desporto: 15%
- Livros: 5%

## 🎨 Personalização

### Cores
As cores podem ser facilmente alteradas através das variáveis CSS no ficheiro `style.css`:

```css
:root {
    --primary-color: #4e73df;
    --success-color: #1cc88a;
    --info-color: #36b9cc;
    --warning-color: #f6c23e;
    --danger-color: #e74a3b;
}
```

### Dados
Para alterar os dados dos gráficos, edite as variáveis no ficheiro `script.js`:

```javascript
const dadosVendas = {
    labels: ['Jan', 'Fev', 'Mar', ...],
    datasets: [...]
};
```

## 📱 Compatibilidade

### Navegadores Suportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dispositivos
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Desenvolvimento Futuro

### Funcionalidades Planeadas
- [ ] Integração com API real de dados
- [ ] Filtros por período de tempo
- [ ] Exportação para PDF/Excel
- [ ] Dashboard de utilizadores
- [ ] Notificações em tempo real
- [ ] Modo escuro/claro
- [ ] Múltiplos idiomas

### Melhorias Técnicas
- [ ] Service Workers para cache
- [ ] Progressive Web App (PWA)
- [ ] Testes automatizados
- [ ] Otimização de performance
- [ ] Acessibilidade (WCAG 2.1)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração. Sinta-se livre para usar, modificar e distribuir conforme necessário.

## 👨‍💻 Contribuição

Este projeto foi desenvolvido como parte do **PROJETO 3 – Dashboard Administrativo** com foco em:

- **Design e desenvolvimento da interface**: Layout moderno e responsivo
- **Integração com Chart.js**: Gráficos dinâmicos e interativos
- **Cards responsivos com métricas**: KPIs visuais e informativos
- **Estrutura modular**: Código organizado e reutilizável

## 📞 Suporte

Para questões ou sugestões sobre este projeto, por favor consulte a documentação ou entre em contacto através dos canais apropriados.

---

**FastTrack Dashboard** - Transformando dados em insights visuais 📊✨

