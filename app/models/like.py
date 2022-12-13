from .db import db, environment, SCHEMA, add_prefix_for_prod
import  datetime

class Like(db.Model):
    __tablename__ = 'likes'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')))
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')))
    created_date = db.Column(db.Date, default=datetime.datetime.now, nullable=False)

    user = db.relationship("User", back_populates = "my_likes")
    story = db.relationship("Story", back_populates = 'story_likes')
    comment = db.relationship("Comment", back_populates = 'comment_likes')

# added to to_dict to use depending on the context

    def to_dict_story(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'story_id': self.story_id
        }
    def to_dict_comment(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'comment_id': self.comment_id
        }
