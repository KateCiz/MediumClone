from .db import db
import datetime

class Story(db.Model):
    __tablename__ = 'stories'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text(20000), nullable=False)
    image_url = db.Column(db.String(300))
    created_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    story_likes = db.relationship("Like", back_populates = 'story')
    comments = db.relationship("Comment", back_populates = 'story')
    user = db.relationship("User", back_populates = 'my_stories')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'content': self.content,
            'image_url': self.image_url,
            'created_date': self.created_date
        }
