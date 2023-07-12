from flask import Blueprint, jsonify, request
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

@user_routes.route('/single')
@login_required
def single_user():
    type = request.args.get("type")
    val = request.args.get("val")
    print("type ================> ", type)
    if type == 'email':
        user = User.query.filter_by(email = val).first()
        print("user ================> ", user)

        return user.to_dict_relationship()
    elif type == 'id':
        user = User.query.get(val)
        return user.to_dict_relationship()
    return


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_relationship()
