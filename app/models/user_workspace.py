from .db import db, environment, SCHEMA, add_prefix_for_prod

users_workspaces = db.Table(
    'users_workspaces',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('workspace_id', db.Integer, db.ForeignKey(add_prefix_for_prod('workspaces.id')), primary_key=True)
)

if environment == "production":
    users_workspaces.schema = SCHEMA
