from .db import db
import datetime

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
        lazy='dynamic')

    user = db.relationship("User", back_populates= 'my_comments')
    story = db.relationship("Story", back_populates = 'comments')
    comment_likes = db.relationship("Like", back_populates= 'comment')
