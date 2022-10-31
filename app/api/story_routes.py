from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import StoryEditorForm
from app.models import db, Story, User, Comment, Like
from sqlalchemy.orm import joinedload
from datetime import datetime

story_routes = Blueprint('stories', __name__)

#DONE
# get all stories
@story_routes.route('/')
def get_all_stories():
    stories = Story.query.order_by(Story.created_date.desc()).all()
    if not bool(stories):
        return jsonify({'message': 'Stories could not be found'}), 404
    return jsonify({'Stories': [story.preview_story_to_dict() for story in stories]}), 200

#DONE
# create a story
@story_routes.route('/', methods=['POST'])
@login_required
def create_story():
    form = StoryEditorForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        story = Story(
            user_id=current_user.id,
            title=form.data['title'],
            content=form.data['content'],
            image_url=form.data['image_url']
        )
        db.session.add(story)
        db.session.commit()
        return story.to_dict()
    else:
        return jsonify({'message': 'Story needs the have a title and content'}), 400


#DONE
# get a single story
@story_routes.route('/<int:story_id>')
def get_one_story(story_id):
    story = Story.query.filter(Story.id == story_id).first()
    if story:
        story_obj = story.full_story_to_dict()
        return jsonify(story_obj), 200
    else:
        return jsonify({'message': 'Story could not be found'}), 404

#DELETE IS DONE, EDIT IS DONE
# edit & delete a single story
@story_routes.route('/<int:story_id>', methods=['PUT', 'DELETE'])
@login_required
def update_one_story(story_id):
    if request.method == 'PUT':
        form = StoryEditorForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        story = Story.query.filter(Story.id == story_id).first()
        if story:
            if story.user_id == current_user.id:
                if form.validate_on_submit():
                    story.title = form.data['title'] or story.title
                    story.content=form.data['content'] or story.content
                    story.image_url=form.data['image_url'] or story.image_url
                    story.updated_date = datetime.now()
                    db.session.add(story)
                    db.session.commit()
                    return jsonify(story.to_dict()), 200
                else:
                    return jsonify({'message': 'Story needs the have a title and content'}), 400
            else:
                return jsonify({'message': 'Users can only edit their own stories'}), 403
        else:
            return jsonify({'message': 'Story could not be found'}), 404

    if request.method == 'DELETE':
        story = Story.query.get(story_id)
        if story:
            if story.user_id == current_user.id:
                db.session.delete(story)
                db.session.commit()
                return jsonify({'message': 'Successfully deleted'}), 200
            else:
                return jsonify({'message': 'Users can only delete their own stories'}), 403
        else:
            return jsonify({'message': 'Story could not be found'}), 404
