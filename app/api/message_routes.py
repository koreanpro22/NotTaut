from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db, Workspace, Message
from .auth_routes import validation_errors_to_error_messages
from ..forms import CreateMessageForm, UpdateMessageForm

message_routes = Blueprint('messages', __name__)


#GET ALL CHANNEL MESSAGES BY SENDER AND RECIPIENT ID
@message_routes.route('/<int:sender_id>/<int:recipient_id>')
def get_channel_message(recipient_id):
    channel = Channel.query.get(recipient_id)
    channelDict = channel.to_dict_all()
    messages = channelDict['messages']
    return messages


#GET ALL MESSAGES BY CHANNEL iD
@message_routes.route('/all/<int:channel_id>')
@login_required
def all_messages(channel_id):
    messages = Message.query.filter(Message.channel_id == channel_id)
    return {'messages': [message.to_dict_all() for message in messages]}

#GET SINGLE MESSAGE BY MESSAGE ID
@message_routes.route('/single/<int:message_id>')
@login_required
def single_message(message_id):
    message = Message.query.get(message_id)
    return {'message': message.to_dict_all()}

#CREATE MESSAGE BY CHANNEL ID
@message_routes.route('/single/<int:channel_id>', methods=['POST'])
@login_required
def create_message(channel_id):
    form = CreateMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_message = Message(
            text=form.data['text'],
            channel_id=channel_id,
            user_id=current_user.id
        )
        db.session.add(new_message)
        db.session.commit()
        return { 'message': new_message.to_dict_all() }
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#UPDATE MESSAGE BY MESSAGE ID
@message_routes.route('/single/<int:message_id>', methods=['PUT'])
@login_required
def update_message(message_id):
    message = Message.query.get(message_id)
    form = UpdateMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message.text=form.data['text']
        db.session.commit()
        return { 'message': message.to_dict_all() }
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#DELETE MESSAGE BY ID
@message_routes.route('/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(message_id):
    message = Message.query.get(message_id)

    if not message:
        return {'errors': ['Message does not exist']}, 404

    if (current_user.id == message.user_id):
        db.session.delete(message)
        db.session.commit()
        return {'message': 'Successfully deleted!'}
    else:
        return {'errors': ['Unauthorized']}, 401
