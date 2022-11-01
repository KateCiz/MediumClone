from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Story


feed_routes = Blueprint('feed', __name__)

#my feed with followers
@feed_routes.route('/myfollows')
@login_required
def get_feed():
    feed = []
    user = User.query.get(current_user.id)
    followed_stories = user.followed_stories().all()

    for story in followed_stories:
        data = story.preview_story_to_dict()
        
        feed.append(data)

    return jsonify({'Stories': [story for story in feed]}), 200
