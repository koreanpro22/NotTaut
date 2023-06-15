from flask_socketio import SocketIO, emit
import os
from app.models import Message, db
socketio = SocketIO()

if os.environ.get('FLASK_ENV') == 'production':
    origins = ['https://nottaut.onrender.com']
else:
    origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("chat")
def handle_chat(data):
    if data != 'User connected!':
        print('hitting socket backend ================================================>')
        if ('message_id' in data):
            message = Message.query.get(data['message_id'])
            print('hitting edit ==================================================================> ', data)
            if (len(data) > 1):
                print('hitting edit ==================================================================> ', data)
                message.text = data['text']
            else:
                db.session.delete(message)
        else:
            message = Message(
                text=data['text'],
                user_id=data['user_id'],
                channel_id=data['channel_id']
            )
            db.session.add(message)
        db.session.commit()
    emit('chat', data, broadcast=True)
