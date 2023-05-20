from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db, Workspace
from .auth_routes import validation_errors_to_error_messages

workspace_routes = Blueprint('workspaces', __name__)

#GET SINGLE WORKSPACE BY WORKSPACE ID
@workspace_routes.route('/single/<int:workspace_id>')
@login_required
def single_channel(workspace_id):
    workspace = Workspace.query.get(workspace_id)
    return {'workspace': workspace.to_dict_all()}
