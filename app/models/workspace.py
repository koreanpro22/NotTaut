from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Workspace(db.Model, UserMixin):
    __tablename__ = 'workspaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    owner = db.relationship('User', back_populates='workspaces')
    workspace_users = db.relationship('User', secondary='User_Workspace', back_populates='workspaces')
    channels = db.relationship('Channel', back_populates='workspaces')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'owner': self.owner,
            'workspace_users': self.workspace_users,
            'channels': self.channels
        }
