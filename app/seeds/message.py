from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_messages():
    msg1 = Message(
        text='Message 1',
        channel_id='1',
        user_id='1'
    )
    msg2 = Message(
        text='Message 2',
        channel_id='1',
        user_id='2'
    )
    msg3 = Message(
        text='Message 3',
        channel_id='1',
        user_id='3'
    )
    msg4 = Message(
        text='Message 4',
        channel_id='1',
        user_id='1'
    )
    msg5 = Message(
        text='Message 5',
        channel_id='1',
        user_id='2'
    )
    msg6 = Message(
        text='Message 6',
        channel_id='1',
        user_id='3'
    )
    msg7 = Message(
        text='Message 1',
        channel_id='2',
        user_id='1'
    )
    msg8 = Message(
        text='Message 2',
        channel_id='2',
        user_id='2'
    )
    msg9 = Message(
        text='Message 3',
        channel_id='2',
        user_id='3'
    )
    msg10 = Message(
        text='Message 4',
        channel_id='2',
        user_id='1'
    )
    msg11 = Message(
        text='Message 5',
        channel_id='2',
        user_id='2'
    )
    msg12 = Message(
        text='Message 6',
        channel_id='2',
        user_id='3'
    )

    msgs = [msg1,msg2,msg3,msg4,msg5,msg6,msg7,msg8,msg9,msg10,msg11,msg12]

    [db.session.add(msg) for msg in msgs]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
