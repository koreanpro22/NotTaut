from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime
from .user_channel import users_channels

class Channel(db.Model, UserMixin):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    topic = db.Column(db.String(40), nullable=True)
    description = db.Column(db.String(100), nullable=True)
    dm = db.Column(db.Boolean, nullable=True)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)
    workspace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('workspaces.id')))

    workspace = db.relationship('Workspace', back_populates='channels')
    channel_users = db.relationship('User', secondary=users_channels, back_populates='user_channels')
    messages = db.relationship('Message', back_populates='channel')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'topic': self.topic,
            'description': self.description,
            'dm': self.dm,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'workspace_id': self.workspace.to_dict().id
        }

    def to_dict_all(self):
        return {
            'id': self.id,
            'name': self.name,
            'topic': self.topic,
            'description': self.description,
            'dm': self.dm,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'workspace': self.workspace.to_dict(),
            'channel_users': [user.to_dict() for user in self.channel_users],
            'messages': [message.to_dict() for message in self.messages]
        }
