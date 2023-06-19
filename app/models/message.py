from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Message(db.Model, UserMixin):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.String, default=datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
    updated_at = db.Column(db.String, default=datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    channel = db.relationship('Channel', back_populates='messages')
    user = db.relationship('User', back_populates='messages')
    thread_messages = db.relationship('Thread_Message', back_populates='messages', cascade="all, delete-orphan")

    #GET ALL MESSAGE INFORMATION
    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id,
            'channel_id': self.channel_id
        }

    #GET ALL MESSAGE RELATIONSHIPS
    def to_dict_all(self):
        return {
            'id': self.id,
            'text': self.text,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'channel': self.channel.to_dict(),
            'user': self.user.to_dict(),
            'thread_messages': [thread_message.to_dict() for thread_message in self.thread_messages]
        }

    def to_dict_relationship(self):
        return {
            'id': self.id,
            'text': self.text,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'channel': self.channel.to_dict(),
            'user': self.user.to_dict(),
            'thread_messages': [thread_message.id for thread_message in self.thread_messages]
        }
