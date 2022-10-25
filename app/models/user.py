from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime

follows = db.Table(
    "follows",
    db.Column("followed_user_id", db.Integer, db.ForeignKey('users.id')),
    db.Column("user_id", db.Integer, db.ForeignKey('users.id')),

)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(300))
    image_profile_url = db.Column(db.String(300))
    hashed_password = db.Column(db.String(255), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.datetime.now)

    followed = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.user_id == id),
        secondaryjoin=(follows.c.followed_user_id == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )

    my_likes = db.relationship("Like", back_populates='user')
    my_comments = db.relationship("Comment", back_populates='user')
    my_stories = db.relationship("Story", back_populates= 'user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def is_following(self, user):
        return self.followed.filter(follows.c.followed_user_id == user.id).count() > 0

    def unfollow(self, user):
        if(self.is_following(user)):
            self.followed.remove(user)
            
    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'email': self.email,
            'last_name': self.last_name,
            'bio': self.bio,
            'image_profile_url': self.image_profile_url,
            'created_date': self.created_date
        }
