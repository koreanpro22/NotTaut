from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db, Workspace
from .auth_routes import validation_errors_to_error_messages
from ..forms import CreateWorkspaceForm

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

@workspace_routes.route('/')
@login_required
def create_workspace():
    form = CreateWorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_workspace = Workspace(
            name=form.data['name'],
            owner_id=current_user['id']
        )
        # Add board to database
        db.session.add(new_workspace)
        # Updates database
        db.session.commit()
        return { 'workspace': new_workspace.to_dict_all() }
    # Returns validation errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
