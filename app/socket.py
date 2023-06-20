from flask_socketio import SocketIO, emit
import os
from app.models import Message, db
socketio = SocketIO()

if os.environ.get('FLASK_ENV') == 'production':
    origins = ['https://nottaut.onrender.com']
else:
    origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)
# message id, text + message id, text foreign key id

@socketio.on("chat")
def handle_chat(data):
    if data != 'User connected!':
        if ('message_id' in data):
            message = Message.query.get(data['message_id'])
            if (len(data) > 1):
                message.text = data['text']
            else:
                db.session.delete(message)
            db.session.commit()
            emit('chat', data, broadcast=True)
        else:
            message = Message(
                text=data['text'],
                user_id=data['user_id'],
                channel_id=data['channel_id']
            )
            db.session.add(message)
            db.session.commit()
            res = message.to_dict_relationship()
            print('MESSAGE IN SOCKET PY ======>', message.to_dict_relationship())
            emit('chat', res, broadcast=True)

        # return message
    # print('DICT MESSAGE IN SOCKET PY ===================================>', message.to_dict())
    # print('ALL MESSAGE IN SOCKET PY ===================================>', message.to_dict_all())
