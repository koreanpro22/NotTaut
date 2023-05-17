from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Channel(db.Model, UserMixin):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    topic = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    dm = db.Column(db.Boolean, nullable=True)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)
    workspace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('workspaces.id')))

    workspace = db.relationship('Workspace', back_populates='workspaces')
    channel_users = db.relationship('User', secondary='User_Channel', back_populates='channels')
    messages = db.relationship('Message', back_populates='channels')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'topic': self.topic,
            'description': self.description,
            'dm': self.dm,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'workspace_id': self.workspace_id,
            'workspace': self.workspace,
            'channel_users': self.channel_users,
            'messages': self.messages
        }
