from werkzeug.security import generate_password_hash, check_password_hash
from .db import db, environment, SCHEMA
from flask_login import UserMixin
from datetime import datetime
from .user_channel import users_channels
from .user_workspace import users_workspaces

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
    profile_pic = db.Column(db.Text, nullable=True)
    title = db.Column(db.String(50), nullable=True)
    phone_number = db.Column(db.String(50), nullable=True)
    timezone = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    workspaces_owned = db.relationship('Workspace', back_populates='owner', cascade="all, delete-orphan")
    user_workspaces = db.relationship('Workspace', secondary=users_workspaces, back_populates='workspace_users', cascade='all, delete')
    user_channels = db.relationship('Channel', secondary=users_channels, back_populates='channel_users', cascade='all, delete')
    messages = db.relationship('Message', back_populates='user', cascade="all, delete-orphan")
    thread_messages = db.relationship('Thread_Message', back_populates='user', cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    #GET ALL USER INFORMATION
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
            'timezone': self.timezone
        }

    #GET ALL USER RELATIONSHIPS
    def to_dict_all(self):
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
            'updated_at': self.updated_at,
            'user_workspaces': [workspace.to_dict() for workspace in self.user_workspaces],
            'user_channels': [channel.to_dict() for channel in self.user_channels],
            'messages': [message.to_dict() for message in self.messages],
            'thread_messages': [thread_message.to_dict() for thread_message in self.thread_messages]
        }

    def to_dict_relationship(self):
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
            'updated_at': self.updated_at,
            'user_workspaces': [workspace.id for workspace in self.user_workspaces],
            # 'user_workspaces': {workspace.id: workspace.id for workspace in self.user_workspaces},
            'user_channels': [channel.id for channel in self.user_channels],
            'messages': [message.id for message in self.messages],
            'thread_messages': [thread_message.id for thread_message in self.thread_messages]
        }
