from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Thread_Message(db.Model, UserMixin):
    __tablename__ = 'thread_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('messages.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    messages = db.relationship('Message', back_populates='thread_messages')
    user = db.relationship('User', back_populates='thread_messages')


    #GET THREAD MESSAGE INFORMATION
    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'message_id': self.message.to_dict(),
            'user_id': self.user.to_dict()
        }

    #GET ALL THREAD MESSAGE RELATIONSHIPS
    def to_dict_all(self):
        return {
            'id': self.id,
            'text': self.text,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'message_id': self.message_id,
            'message': [message.to_dict() for message in self.messages],
            'user': self.user.to_dict()
        }
