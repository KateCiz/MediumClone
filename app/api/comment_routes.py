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
    base = [comment.to_dict() for comment in story.comments if comment.parent_id is None] # Can be improved
    return jsonify(base)
  else:
    return jsonify({'message': 'Story could not be found'}), 404


@comment_routes.route('/comments/<int:comment_Id>/replies')
def get_comment_replies(comment_Id):
  comment = Comment.query.get(comment_Id)
  if comment:
    replies = [comment.to_dict() for comment in comment.replies]
    return jsonify(replies)
  else:
    return jsonify({'message': 'Comment could not be found'}), 404


@comment_routes.route('/stories/<int:story_id>/comments', methods=['POST'])
@login_required
def create_story_comment(story_id):
  curr_user_id = current_user.id
  story = Story.query.get(story_id)
  form = CommentForm()
  if story:
    if form.validate_on_submit:
      comment = Comment(
            content=form.data['content'],
            story_id=story_id,
            user_id=curr_user_id
        )
      db.session.add(comment)
      db.session.commit()
      return comment.to_dict()
    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  else:
    return jsonify({'message': 'Story could not be found'}), 404


@comment_routes.route('/comments<int:comment_id>/replies', methods=['POST'])
@login_required
def reply_to_a_comment(comment_id):
  curr_user_id = current_user.id
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
      return reply.to_dict()
    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  else:
    return jsonify({'message': 'Comment could not be found'}), 404






# @comment_routes.route('/comments/test')
# def test():
#   # story = Story(user_id=1, title='wow', content='heyyy')
#   # db.session.add(story)
#   # print(story)
#   # db.session.commit()
#   # return story.title
#   user = User.query.get(4)
#   story = Story.query.get(1)
#   print(user.my_stories[0].title)
#   com = Comment(user_id=4, content='asdf')
#   story.comments.append(com)
#   # user.my_comments.append(com)
#   # user.my_stories[0].comments.append(com)
#   db.session.add(com)
#   db.session.commit()
#   com2 = Comment.query.get(4)
#   return com2.replies[0].content
