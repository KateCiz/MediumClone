from flask import Blueprint, request #when do I use request and when do I use a form????
from flask_login import login_required, current_user
from app.forms import StoryEditorForm
from app.models import db, Story, User, Comment, Like

story_routes = Blueprint('stories', __name__)


#MAYBE DONE - EXCEPT VALIDATION ERRORS
# get all stories
@story_routes.route('/stories')
def get_all_stories():
    stories = Story.query.(Story)options(joinedload(Story.user)).order_by(Story.created_date.desc())
    print(stories)
    if not stories:
        raise Exception('there are no stories')
    obj_stories = [story.author_info_to_dict() for story in stories]
    return {'Stories': obj_stories}


@story_routes.route('/stories', methods=['POST'])
@login_required
# def get_stories_feed():
#     stories = Story.query().options(joinedload(Story.user)).filter(Story.user.in_(current_user.follows)).order_by(Story.created_date.desc())
#     obj_stories = [story.author_info_to_dict() for story in stories]
#     return {'Stories': obj_stories}

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
   

#NOT DONE
# get a single story
@story_routes.route('/stories/<int:story_id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def get_one_story(story_id):
    story = Story.query.(story_id).options(joinedload(Story.user))
    number_of_likes = story.num_comments()
    number_of_comments = story.num_likes()
    story_obj = story.to_dict()
    story_obj['num_likes'] = number_of_likes
    story_obj['num_comments'] = number_of_comments
    print(story)
    return story_obj

def update_one_story(story_id):
    form = StoryEditorForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    story = Story.query.get(story_id)
    if story.user_id == current_user.id:
        if form.validate_on_submit():
            story.title = form.data['title'],
            story.content=form.data['content'],
            story.image_url=form.data['image_url']
        db.session.add(story)
        db.session.commit()
        return story.to_dict()
    
def delete_one_story(story_id):
    story = Story.query.get(story_id)
    if story:
        if story.user_id == current_user.id:
            db.session.delete(story)
            db.session.commit()
            return story.to_dict()
        