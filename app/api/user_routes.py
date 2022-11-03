from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.profile_form import ProfileEditorForm
from app.models import User, db

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


#EDIT PROFILE ROUTE
@user_routes.route('/profile/<int:id>/edit', methods=['PUT'])
@login_required
def edit_user_profile(id):
    user = User.query.get(id)
    form = ProfileEditorForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if user.id == current_user.id:
        if form.validate_on_submit():
            user.bio = form.data['bio'] or user.bio
            user.image_profile_url = form.data['image_profile_url'] or user.image_profile_url
            db.session.commit()
            return jsonify({'message': 'User Updated'}), 200
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        return jsonify({'message': 'Unauthorized'}), 403
