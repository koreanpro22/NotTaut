from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict_relationship() for user in users]}

@user_routes.route('/single/<str:email>')
@login_required
def single_user(email):
    print('EMAIL INPUT ===============> ', email)
    user = User.query.find(User.email == email)
    return user.to_dict_relationship()


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_relationship()
