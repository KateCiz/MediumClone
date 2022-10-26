from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


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

@user_routes.route('/profile/<int:id>')
def user_profile(id):
    user = User.query.get(id)
    if user:
        author_profile = user.author_side_bar_to_dict()
        comments = [comment.user_comments_to_dict() for comment in user.my_comments]
        stories = [story.to_dict() for story in user.my_stories]
        author_profile['Comments'] = comments
        author_profile['Stories'] = stories
        return jsonify({'Author': author_profile}), 200
    else:
        return jsonify({'message': 'User could not be found'}), 404


