from flask import Blueprint, jsonify, request
from app.models import db, Like, User, Story, Comment
from flask_login import login_required, current_user

like_routes = Blueprint('Likes', __name__)



# like a story/ unlike a story by post id
@like_routes.route('/stories/<int:story_Id>/likes', methods=['POST', 'DELETE'])
@login_required
def like_a_story(story_Id):
    cur_user = current_user.id
    story = bool(Story.query.filter_by(id=story_Id).first())

    # check if like already exists
    like = Like.query.filter(Like.user_id == cur_user,
                               Like.story_id == int(story_Id))
    exists = [likes.to_dict_story() for likes in like]

    if request.method == 'POST':
        if(exists):
            return jsonify({'message': 'Already liked story'}), 409
        else:
            story_like = Like(user_id=cur_user,
                              story_id=story_Id)
            db.session.add(story_like)
            db.session.commit()
            return story_like.to_dict_story(), 201


    if request.method == 'DELETE':
        if(story):
            if(exists):
                like.delete()
                db.session.commit()
                return jsonify({'message': 'Successfully deleted'}), 200
            else:
                return jsonify({'message': 'Like could not be found'}), 404
        else:
            return jsonify({'message': 'Story could not be found'}), 404


# like a story/ unlike a comment by post id
@like_routes.route('/comments/<int:comment_Id>/likes', methods=['POST', 'DELETE'])
@login_required
def like_a_comment(comment_Id):
    cur_user = current_user.id
    comment = bool(Comment.query.filter_by(id=comment_Id).first())

    # check if like already exists
    like = Like.query.filter(Like.user_Id == cur_user,
                               Like.comment_id == int(comment_Id))
    exists = [likes.to_dict_comment() for likes in like]

    if request.method == 'POST':
        if(exists):
            return jsonify({'message': 'Already liked story'}), 409
        else:
            comment_like = Like(user_id=cur_user,
                              comment_id=comment_Id)
            db.session.add(comment_like)
            db.session.commit()
            return comment_like.to_dict_comment(), 201


    if request.method == 'DELETE':
        if(comment):
            if(exists):
                like.delete()
                db.session.commit()
                return jsonify({'message': 'Successfully deleted'}), 200
            else:
                return jsonify({'message': 'Like could not be found'}), 404
        else:
            return jsonify({'message': 'Comment could not be found'}), 404

