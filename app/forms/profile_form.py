from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class ProfileEditorForm(FlaskForm):
    bio = StringField('bio', validators=[DataRequired()])
    image_profile_url = StringField('image_profile_url')
    submit = SubmitField('Save')
