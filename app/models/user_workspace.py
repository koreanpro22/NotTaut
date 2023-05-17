from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User_Workspace(db.Model, UserMixin):
    __tablename__ = 'users_workspaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    workspace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('workspaces.id')))
