from flask_socketio import SocketIO, emit
import os
from app.models import Message, db
socketio = SocketIO()

if os.environ.get('FLASK_ENV') == 'production':
    origins = []
else:
    origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("chat")
def handle_chat(data):
    print('HITING SOCKET.PY ===========================================>')
    if data != 'User connected!':
        message = Message(
            text=data['text'],
            user_id=data['user_id'],
            channel_id=data['channel_id']
        )
        print('MESSAGE ===========================================> ', message)
        print('DB ===========================================> ', db.session)
        db.session.add(message)
        db.session.commit()
    emit('chat', data, broadcast=True)


