from flask import Blueprint, jsonify
from app.models import User, db
from flask_login import current_user, login_required

follow_routes = Blueprint('follows', __name__)

# get a users followers list
@follow_routes.route('/<int:user_id>/followers')
def get_followers(user_id):
    user = User.query.get(user_id)
    followers = user.list_followers()
    result = []
    for follow in followers:
        data = {
            'user': follow.to_dict()
        }
        result.append(data)
    if (user):
        return jsonify({'Followers': [follow for follow in result]}), 200
    else:
        return jsonify({'message': "user could not be found"}), 404

# get a users follows list
@follow_routes.route('/<int:user_id>/follows')
def get_follows(user_id):
    user = User.query.get(user_id)
    follows = user.list_follows()
    result = []
    for follow in follows:
        data = {
            'user': follow.to_dict()
        }
        result.append(data)
    if (user):
        return jsonify({'Follows': [follow for follow in result]}), 200
    else:
        return jsonify({'message': "user could not be found"}), 404

# follow a user where user_id in the route is the user to follow
@follow_routes.route('/<int:user_id>/follows', methods=["POST"])
@login_required
def follow_user(user_id):
    user = User.query.get(user_id)
    cur_user = User.query.get(current_user.id)

    if(user):
        cur_user.follow(user)
        db.session.commit()
        return jsonify({'message': 'successfully followed user'}), 201
    else:
        return jsonify({'message': "user could not be found"}), 404


# unfollow a user where user_id in the route is the user to unfollow
@follow_routes.route('/<int:user_id>/unfollows', methods=["DELETE"])
@login_required
def unfollow_user(user_id):
    user = User.query.get(user_id)
    cur_user = User.query.get(current_user.id)

    if(user):
        cur_user.unfollow(user)
        db.session.commit()
        return jsonify({'message': "successfully unfollowed user"}), 201
    else:
        return jsonify({'message': "user could not be found"}), 404
