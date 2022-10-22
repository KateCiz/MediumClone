from .db import db
import  datetime

class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey('stories.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    created_date = db.Column(db.Date, default=datetime.datetime.now, nullable=False)

    user = db.relationship("User", back_populates = "my_likes")
    story = db.relationship("Story", back_populates = 'story_likes')
    comment = db.relationship("Comment", back_populates = 'comment_likes')
