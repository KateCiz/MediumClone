from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class ProfileEditorForm(FlaskForm):
    bio = StringField('bio')
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    image = StringField('image')
    submit = SubmitField('Save')
