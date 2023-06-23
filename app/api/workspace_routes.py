from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db, Workspace, User
from .auth_routes import validation_errors_to_error_messages
from ..forms import CreateWorkspaceForm, UpdateWorkspaceForm

workspace_routes = Blueprint('workspaces', __name__)

#GET ALL USER WORKSPACES
@workspace_routes.route('/all')
@login_required
def all_workspaces():
    user = User.query.get(current_user.id)
    user_workspaces = user.user_workspaces
    return {'workspaces': [workspace.to_dict_relationship() for workspace in user_workspaces]}

#GET SINGLE WORKSPACE BY WORKSPACE ID
@workspace_routes.route('/single/<int:workspace_id>')
@login_required
def single_workspace(workspace_id):
    workspace = Workspace.query.get(workspace_id)
    return {'workspace': workspace.to_dict_relationship()}

@workspace_routes.route('/', methods=['POST'])
@login_required
def create_workspace():
    form = CreateWorkspaceForm()
    # user email addressess passed in
    # users = form.data['users']
    # db_users = []
    # [db_users.append(User.query.get(email)) for email in users]
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_workspace = Workspace(
            name=form.data['name'],
            owner_id=current_user.id,
            workspace_users=[current_user]
            # workspace_users=db_users w/ current_user
        )
        # Add board to database
        db.session.add(new_workspace)
        # Updates database
        db.session.commit()



        general_channel = Channel(
            name='General',
            workspace_id=new_workspace.id,
            channel_users=[current_user]
        )

        db.session.add(general_channel)
        db.session.commit()

        return { 'workspace': new_workspace.to_dict_relationship() }
    # Returns validation errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@workspace_routes.route('/<int:workspace_id>', methods=['PUT'])
@login_required
def update_workspace(workspace_id):
    form = UpdateWorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workspace = Workspace.query.get(workspace_id)

        if workspace:
            workspace.name=form.data['name']
            db.session.commit()
            return { 'workspace' : workspace.to_dict_all() }
        return {'errors': 'Workspace does not exist!'}, 404
    # Returns validation errors
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
