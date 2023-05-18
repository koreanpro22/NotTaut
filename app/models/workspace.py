from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .user_workspace import users_workspaces


class Workspace(db.Model, UserMixin):
    __tablename__ = 'workspaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    owner = db.relationship(
        'User',
        overlaps='user_workspaces',
        back_populates='workspaces_owned'
    )

    workspace_users = db.relationship(
        'User',
        secondary=users_workspaces,
        back_populates='user_workspaces'
    )

    channels = db.relationship(
        'Channel',
        back_populates='workspace'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'owner_id': self.owner_id,
        }

    def to_dict_all(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'owner': self.owner.to_dict(),
            'workspace_users': [user.to_dict() for user in self.workspace_users],
            'channels': [channel.to_dict() for channel in self.channels]
        }
