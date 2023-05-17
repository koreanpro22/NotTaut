from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    display_name = db.Column(db.String(40), nullable=True)
    name_pronunciation = db.Column(db.String(40), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    status = db.Column(db.String(100), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(100), nullable=True)
    title = db.Column(db.String(50), nullable=True)
    phone_number = db.Column(db.String(50), nullable=True)
    timezone = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    user_workspaces = db.relationship('Workspace', secondary='User_Workspace', back_populates='users')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'display_name': self.display_name,
            'name_pronunciation': self.name_pronunciation,
            'email': self.email,
            'status': self.status,
            'hashed_password': self.hashed_password,
            'profile_pic': self.profile_pic,
            'title': self.title,
            'phone_number': self.phone_number,
            'timezone': self.timezone,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
