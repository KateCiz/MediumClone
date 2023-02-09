from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.profile_form import ProfileEditorForm
from app.models import User, db
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)

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
            url = None
            if 'image' in request.files:
                image =  request.files["image"]
                if image:
                    if not allowed_file(image.filename):
                        return {"errors": "file type not permitted"}, 409
                    image.filename = get_unique_filename(image.filename)
                    upload = upload_file_to_s3(image)
                    if "url" not in upload:
                        return upload, 400
                    url = upload["url"]
            user.first_name = form.data['first_name'] or user.first_name
            user.last_name = form.data['last_name'] or user.last_name
            user.bio = form.data['bio'] or user.bio
            user.image_profile_url = url or user.image_profile_url
            db.session.commit()
            return jsonify({'message': 'User Updated'}), 200
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        return jsonify({'message': 'Unauthorized'}), 403
