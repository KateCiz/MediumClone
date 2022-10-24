from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

#PROBABLY WON'T NEED THIS CODE
# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField(
        'first name', validators=[DataRequired()])
    last_name  = StringField('last name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists, Email])
    password = StringField('password', validators=[DataRequired()])
