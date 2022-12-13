from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Story(db.Model):
    __tablename__ = 'stories'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text(), nullable=False)
    image_url = db.Column(db.String(300))
    created_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    story_likes = db.relationship("Like", back_populates = 'story', cascade='all, delete-orphan')
    comments = db.relationship("Comment", back_populates = 'story', cascade='all, delete-orphan')
    user = db.relationship("User", back_populates = 'my_stories')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'content': self.content,
            'image_url': self.image_url,
            'created_date':  self.created_date,
            'updated_date': self.updated_date
        }

    def preview_story_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'content': self.content,
            'image_url': self.image_url,
            'created_date':  self.created_date,
            'updated_date': self.updated_date,
            'Author': self.user.author_preview_to_dict()
        }

    def full_story_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'content': self.content,
            'image_url': self.image_url,
            'created_date':  self.created_date,
            'updated_date': self.updated_date,
            'Author': self.user.author_side_bar_to_dict(),
            'num_likes': self.num_likes(),
            'num_comments': self.num_comments(),
            'like_accounts': [like.to_dict_story() for like in self.story_likes]
        }

    def num_likes(self):
        return len(self.story_likes)

    def num_comments(self):
        return len(self.comments)
