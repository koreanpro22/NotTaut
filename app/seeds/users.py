from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        name='Demo',
        display_name='THE Demo',
        name_pronunciation='De-mo',
        email='demo@aa.io',
        status='Feeling good!',
        password='password',
        profile_pic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJhS84-YD1Ehdo8FS1HP6ZtHzA8t7TctEfn4RgDockDw&usqp=CAU&ec=48665701',
        title='Junior Developer',
        )
    test1 = User(
        name='Tester 1',
        display_name='THE Tester 1',
        name_pronunciation='Te-st-1',
        email='test1@aa.io',
        status='Feeling Amazing!',
        password='password',
        profile_pic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJhS84-YD1Ehdo8FS1HP6ZtHzA8t7TctEfn4RgDockDw&usqp=CAU&ec=48665701',
        title='Senior Developer'
        )
    test2 = User(
        name='Tester 2',
        display_name='THE Tester 2',
        name_pronunciation='Te-st-2',
        email='test2@aa.io',
        status='Feeling sad!',
        password='password',
        profile_pic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJhS84-YD1Ehdo8FS1HP6ZtHzA8t7TctEfn4RgDockDw&usqp=CAU&ec=48665701',
        title='CEO'
        )

    db.session.add(demo)
    db.session.add(test1)
    db.session.add(test2)
    db.session.commit()

    return [demo, test1, test2]

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
