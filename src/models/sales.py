from src.models.user import db
from datetime import datetime

class SalesData(db.Model):
    __tablename__ = 'sales_data'
    
    id = db.Column(db.Integer, primary_key=True)
    month = db.Column(db.String(20), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'month': self.month,
            'year': self.year,
            'amount': self.amount,
            'created_at': self.created_at.isoformat()
        }

class ProductMetrics(db.Model):
    __tablename__ = 'product_metrics'
    
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    percentage = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'percentage': self.percentage,
            'created_at': self.created_at.isoformat()
        }

class UserData(db.Model):
    __tablename__ = 'user_data'
    
    id = db.Column(db.Integer, primary_key=True)
    total_orders = db.Column(db.Integer, nullable=False)
    conversion_rate = db.Column(db.Float, nullable=False)
    active_products = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'total_orders': self.total_orders,
            'conversion_rate': self.conversion_rate,
            'active_products': self.active_products,
            'created_at': self.created_at.isoformat()
        }

class RecentActivity(db.Model):
    __tablename__ = 'recent_activity'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(20), nullable=False)
    customer_name = db.Column(db.String(100), nullable=False)
    product = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    order_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'customer_name': self.customer_name,
            'product': self.product,
            'amount': self.amount,
            'status': self.status,
            'order_date': self.order_date.isoformat(),
            'created_at': self.created_at.isoformat()
        }

