from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class ProfileEditorForm(FlaskForm):
    bio = StringField('bio')
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    image_profile_url = StringField('image_profile_url')
    submit = SubmitField('Save')
