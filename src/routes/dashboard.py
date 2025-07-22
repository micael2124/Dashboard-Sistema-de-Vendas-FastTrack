from flask import Blueprint, jsonify, request
from src.models.user import db
from src.models.sales import SalesData, ProductMetrics, UserData, RecentActivity
from datetime import datetime, date
import random

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/sales', methods=['GET'])
def get_sales_data():
    """Retorna dados de vendas mensais"""
    try:
        sales = SalesData.query.all()
        if not sales:
            # Se não há dados, criar dados de exemplo
            create_sample_sales_data()
            sales = SalesData.query.all()
        
        return jsonify({
            'success': True,
            'data': [sale.to_dict() for sale in sales]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@dashboard_bp.route('/products/metrics', methods=['GET'])
def get_product_metrics():
    """Retorna métricas de produtos"""
    try:
        metrics = ProductMetrics.query.all()
        if not metrics:
            # Se não há dados, criar dados de exemplo
            create_sample_product_metrics()
            metrics = ProductMetrics.query.all()
        
        return jsonify({
            'success': True,
            'data': [metric.to_dict() for metric in metrics]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@dashboard_bp.route('/users', methods=['GET'])
def get_user_data():
    """Retorna dados de utilizadores/KPIs"""
    try:
        user_data = UserData.query.first()
        if not user_data:
            # Se não há dados, criar dados de exemplo
            create_sample_user_data()
            user_data = UserData.query.first()
        
        return jsonify({
            'success': True,
            'data': user_data.to_dict()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@dashboard_bp.route('/recent-activity', methods=['GET'])
def get_recent_activity():
    """Retorna atividade recente"""
    try:
        activities = RecentActivity.query.order_by(RecentActivity.created_at.desc()).limit(10).all()
        if not activities:
            # Se não há dados, criar dados de exemplo
            create_sample_recent_activity()
            activities = RecentActivity.query.order_by(RecentActivity.created_at.desc()).limit(10).all()
        
        return jsonify({
            'success': True,
            'data': [activity.to_dict() for activity in activities]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@dashboard_bp.route('/refresh', methods=['POST'])
def refresh_data():
    """Atualiza todos os dados com novos valores aleatórios"""
    try:
        # Atualizar dados de vendas
        sales = SalesData.query.all()
        for sale in sales:
            variation = random.uniform(-0.2, 0.2)  # ±20% de variação
            sale.amount = max(1000, sale.amount * (1 + variation))
        
        # Atualizar métricas de produtos
        metrics = ProductMetrics.query.all()
        total_percentage = 0
        for metric in metrics[:-1]:  # Todos exceto o último
            variation = random.uniform(-0.3, 0.3)  # ±30% de variação
            metric.percentage = max(1, metric.percentage * (1 + variation))
            total_percentage += metric.percentage
        
        # Ajustar o último para que a soma seja 100%
        if metrics:
            metrics[-1].percentage = max(1, 100 - total_percentage)
        
        # Atualizar dados de utilizador
        user_data = UserData.query.first()
        if user_data:
            user_data.total_orders = max(100, int(user_data.total_orders * random.uniform(0.85, 1.15)))
            user_data.conversion_rate = max(10, min(100, user_data.conversion_rate * random.uniform(0.9, 1.1)))
            user_data.active_products = max(50, int(user_data.active_products * random.uniform(0.95, 1.05)))
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Dados atualizados com sucesso'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def create_sample_sales_data():
    """Criar dados de exemplo para vendas"""
    months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    amounts = [32000, 28000, 35000, 42000, 38000, 45000, 48000, 52000, 47000, 51000, 49000, 45280]
    
    for month, amount in zip(months, amounts):
        sale = SalesData(month=month, year=2024, amount=amount)
        db.session.add(sale)
    
    db.session.commit()

def create_sample_product_metrics():
    """Criar dados de exemplo para métricas de produtos"""
    categories = [
        ('Eletrónicos', 35),
        ('Roupas', 25),
        ('Casa', 20),
        ('Desporto', 15),
        ('Livros', 5)
    ]
    
    for category, percentage in categories:
        metric = ProductMetrics(category=category, percentage=percentage)
        db.session.add(metric)
    
    db.session.commit()

def create_sample_user_data():
    """Criar dados de exemplo para utilizadores"""
    user_data = UserData(
        total_orders=1247,
        conversion_rate=68.0,
        active_products=342
    )
    db.session.add(user_data)
    db.session.commit()

def create_sample_recent_activity():
    """Criar dados de exemplo para atividade recente"""
    activities = [
        ('#12847', 'João Silva', 'Smartphone XYZ', 599.99, 'Concluído', date(2024, 1, 15)),
        ('#12846', 'Maria Santos', 'Laptop ABC', 899.99, 'Processando', date(2024, 1, 15)),
        ('#12845', 'Pedro Costa', 'Headphones DEF', 149.99, 'Concluído', date(2024, 1, 14)),
        ('#12844', 'Ana Oliveira', 'Tablet GHI', 299.99, 'Cancelado', date(2024, 1, 14)),
        ('#12843', 'Carlos Ferreira', 'Smartwatch JKL', 199.99, 'Concluído', date(2024, 1, 13))
    ]
    
    for order_id, customer, product, amount, status, order_date in activities:
        activity = RecentActivity(
            order_id=order_id,
            customer_name=customer,
            product=product,
            amount=amount,
            status=status,
            order_date=order_date
        )
        db.session.add(activity)
    
    db.session.commit()

