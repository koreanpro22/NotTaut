from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channels(users):
    channel1 = Channel(
        name='Channel 1 Test',
        workspace_id='1',
        channel_users=users
    )

    channel2 = Channel(
        name='Channel 2 Test',
        workspace_id='1',
        channel_users=users
    )

    channel3 = Channel(
        name='Channel 3 Test',
        workspace_id='2',
        channel_users=users
    )
    
    channel4 = Channel(
        name='Channel 4 Test',
        workspace_id='2',
        channel_users=users
    )

    channel5 = Channel(
        name='Channel 5 Test',
        workspace_id='3',
        channel_users=users
    )

    channel6 = Channel(
        name='Channel 6 Test',
        workspace_id='3',
        channel_users=users
    )

    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.add(channel6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
