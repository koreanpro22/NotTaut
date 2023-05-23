from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db, Workspace
from .auth_routes import validation_errors_to_error_messages

workspace_routes = Blueprint('workspaces', __name__)

#GET ALL WORKSPACES BY USER ID
@workspace_routes.route('/all')
@login_required
def all_workspaces():
    return {'workspaces': [workspace.to_dict() for workspace in current_user.user_workspaces]}

#GET SINGLE WORKSPACE BY WORKSPACE ID
@workspace_routes.route('/single/<int:workspace_id>')
@login_required
def single_workspace(workspace_id):
    workspace = Workspace.query.get(workspace_id)
    print(workspace)
    return {'workspace': workspace.to_dict_all()}
