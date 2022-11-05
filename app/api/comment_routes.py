from multiprocessing import parent_process
from app.forms import CommentForm
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Comment, Story, Like, db

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('/stories/<int:story_Id>/comments')
def get_story_comments(story_Id):
  story = Story.query.get(story_Id)
  if story:
    base = [comment.to_dict(current_user.is_authenticated and current_user.id) for comment in story.comments if comment.parent_id is None] # Can be improved
    return jsonify(base)
  else:
    return jsonify({'message': 'Story could not be found'}), 404


@comment_routes.route('/comments/<int:comment_Id>/replies')
def get_comment_replies(comment_Id):
  comment = Comment.query.get(comment_Id)
  if comment:
    res = comment.to_dict(current_user.is_authenticated and current_user.id)
    res['replies'] = {reply.id: reply.to_dict(current_user.is_authenticated and current_user.id) for reply in comment.replies}
    return jsonify(res)
  else:
    return jsonify({'message': 'Comment could not be found'}), 404


@comment_routes.route('/stories/<int:story_id>/comments', methods=['POST'])
@login_required
def create_story_comment(story_id):
  curr_user_id = current_user.is_authenticated and current_user.id
  story = Story.query.get(story_id)
  form = CommentForm()
  print(form.data)
  if story:
    if form.validate_on_submit:
      comment = Comment(
            content=form.data['content'],
            story_id=story_id,
            user_id=curr_user_id
        )
      db.session.add(comment)
      db.session.commit()
      return comment.to_dict(current_user.is_authenticated and current_user.id)
    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  else:
    return jsonify({'message': 'Story could not be found'}), 404


@comment_routes.route('/comments/<int:comment_id>/replies', methods=['POST'])
@login_required
def reply_to_a_comment(comment_id):
  curr_user_id = current_user.is_authenticated and current_user.id
  comment = Comment.query.get(comment_id)
  form = CommentForm()
  if comment:
    if form.validate_on_submit:
      reply = Comment(
            content=form.data['content'],
            story_id=comment.story_id,
            user_id=curr_user_id,
            parent_id=comment_id
        )
      db.session.add(reply)
      db.session.commit()
      return reply.to_dict(current_user.is_authenticated and current_user.id)
    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  else:
    return jsonify({'message': 'Comment could not be found'}), 404


@comment_routes.route('/comments/<int:comment_id>', methods=['PUT'])
@login_required
def update_a_comment(comment_id):
  curr_user_id = current_user.is_authenticated and current_user.id
  comment = Comment.query.get(comment_id)
  form = CommentForm()
  if comment:
    if form.validate_on_submit:
      if comment.user_id == curr_user_id:
        print(form.data)
        comment.content = form.data['content'] or comment.content
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict(current_user.is_authenticated and current_user.id)
      else:
        return {'errors': ['Unauthorized']}
    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  else:
    return jsonify({'message': 'Comment could not be found'}), 404


@comment_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_a_comment(comment_id):
  curr_user_id = current_user.is_authenticated and current_user.id
  comment = Comment.query.get(comment_id)
  if comment:
    if comment.user_id == curr_user_id:
      db.session.delete(comment)
      db.session.commit()
      return jsonify({"message": "Successfully deleted comment"}), 200
    else:
      return {'errors': ['Unauthorized']}
  else:
    return jsonify({'message': 'Comment could not be found'}), 404

@comment_routes.route('/comments/<int:comment_id>')
@login_required
def get_a_comment(comment_id):
  comment = Comment.query.get(comment_id)
  if comment:
    return jsonify(comment.to_dict(current_user.id)), 200
  else:
    return jsonify({'message': 'Comment could not be found'}), 404
