from .db import db
import datetime
from .like import Like

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String, nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey('stories.id'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    created_date = db.Column(db.Date, default=datetime.datetime.now, nullable=False)
    updated_date = db.Column(db.Date, default=datetime.datetime.now, nullable=False)

    # relation to itself (replies)
    replies = db.relationship(
        'Comment', backref=db.backref('parent', remote_side=[id]),
        lazy='dynamic', cascade='all, delete-orphan')

    user = db.relationship("User", back_populates= 'my_comments')
    story = db.relationship("Story", back_populates = 'comments')
    comment_likes = db.relationship("Like", back_populates= 'comment', cascade='all, delete-orphan')

    def user_comments_to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'story_id': self.story_id,
            'parent_id': self.parent_id,
            'created_date': self.created_date,
            'updated_date': self.updated_date
        }

    def to_dict(self, session_user_id):

        num_replies = db.session.query(Comment).filter(Comment.parent_id == self.id).count()
        liked = db.session.query(Like).filter_by(comment_id=self.id, user_id=session_user_id).count()
        return {
            'id': self.id,
            'author': {
                    'id': self.user.id,
                    'first_name': self.user.first_name,
                    'last_name': self.user.last_name,
                    'image_profile_url': self.user.image_profile_url,
            },
            'liked': liked,
            'content': self.content,
            'num_likes': len(self.comment_likes),
            'num_replies': num_replies,
            'parent_id': self.parent_id,
            'created_date': self.created_date,
            'updated_date': self.updated_date
        }
    # def to_dict_with_replies(self):
    #     return {
    #         'id': self.id,
    #         'author': {
    #                 'id': self.user.id,
    #                 'first_name': self.user.first_name,
    #                 'last_name': self.user.last_name,
    #                 'image_profile_url': self.user.image_profile_url,
    #         },
    #         'content': self.content,
    #         'likes': len(self.comment_likes),
    #         'replies': {comment.id: comment.to_dict() for comment in self.replies},
    #         'created_date': self.created_date,
    #         'updated_date': self.updated_date
    #     }
