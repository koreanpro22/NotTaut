from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class CreateChannelForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    topic = StringField('Topic')
    description = StringField('Description')
