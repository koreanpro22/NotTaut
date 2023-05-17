from .db import db, environment, SCHEMA, add_prefix_for_prod

users_channels = db.Table(
    'users_channels',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('channel_id', db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), primary_key=True)
)

if environment == "production":
    users_channels.schema = SCHEMA
