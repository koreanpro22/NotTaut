from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db, Workspace
from .auth_routes import validation_errors_to_error_messages
from ..forms import CreateChannelForm, UpdateChannelForm

channel_routes = Blueprint('channels', __name__)


#GET ALL CHANNELS BY WORKSPACE iD
@channel_routes.route('/all/<int:workspace_id>')
@login_required
def all_channels(workspace_id):
    channels = Channel.query.filter(Channel.workspace_id == workspace_id)
    return {'channels': [channel.to_dict() for channel in channels]}

#GET SINGLE CHANNEL BY CHANNEL ID
@channel_routes.route('/single/<int:channel_id>')
@login_required
def single_channel(channel_id):
    channel = Channel.query.get(channel_id)

    if not channel:
        return {'errors': ['Channel does not exist']}, 404
    return {'channel': channel.to_dict_all()}

#CREATE CHANNEL BY
@channel_routes.route('/single/<int:workspace_id>', methods=['POST'])
@login_required
def create_channel(workspace_id):
    form = CreateChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_channel = Channel(
            name=form.data['name'],
            workspace_id=workspace_id,
            topic=form.data['topic'],
            description=form.data['description'],
            channel_users=[current_user]
        )
        db.session.add(new_channel)
        # Updates database
        db.session.commit()
        return { 'channel': new_channel.to_dict_all() }
    # Returns validation errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#UPDATE CHANNEL BY CHANNEL ID
@channel_routes.route('/single/<int:channel_id>', methods=['PUT'])
@login_required
def update_channel(channel_id):

    channel = Channel.query.get(channel_id)

    form = UpdateChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel.name=form.data['name']
        channel.topic=form.data['topic']
        channel.description=form.data['description']
        db.session.commit()
        return { 'channel': channel.to_dict_all() }
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#DELETE CHANNEL BY ID
@channel_routes.route('/<int:channel_id>', methods=['DELETE'])
@login_required
def delete_channel(channel_id):
    channel = Channel.query.get(channel_id)
    workspace = Workspace.query.get(channel.workspace_id)

    if not channel:
        return {'errors': ['Channel does not exist']}, 404

    if (current_user.id == workspace.owner_id):
        db.session.delete(channel)
        db.session.commit()
        return {'message': 'Successfully deleted!'}
    else:
        return {'errors': ['Unauthorized']}, 401
