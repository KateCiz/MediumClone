from flask import Blueprint, jsonify
from app.models import User, db
from flask_login import current_user, login_required

follow_routes = Blueprint('follows', __name__)

# get a users followers list
@follow_routes.route('/users/<int:user_id>/followers')
@login_required
def get_followers(user_id):
    user = User.query.get(user_id)

    if (user):
        return jsonify({'Followers': user.followed}), 200
    else:
        return jsonify({'message': "user could not be found"}), 404

# get a users follows list
@follow_routes.route('/users/<int:user_id>/follows')
@login_required
def get_follows(user_id):
    user = User.query.get(user_id)

    if (user):
        return jsonify({'Followers': user.follows}), 200
    else:
        return jsonify({'message': "user could not be found"}), 404

# follow a user where user_id in the route is the user to follow
@follow_routes.route('/users/<int:user_id/follow', methods=["POST"])
@login_required
def follow_user(user_id):
    user = User.query.get(user_id)
    cur_user = current_user.id

    if(user):
        cur_user.follow(user)
        db.session.commit()
    else:
        return jsonify({'message': "user could not be found"}), 404


# unfollow a user where user_id in the route is the user to unfollow
@follow_routes.route('/users/<int:user_id/follow', methods=["DELETE"])
@login_required
def unfollow_user(user_id):
    user = User.query.get(user_id)
    cur_user = current_user.id

    if(user):
        cur_user.unfollow(user)
        db.session.commit()
        return jsonify({'message': "successfully unfollowed user"})
    else:
        return jsonify({'message': "user could not be found"}), 404
