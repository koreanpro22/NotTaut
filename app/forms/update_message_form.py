from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class UpdateMessageForm():
    text = StringField('Name', validators=[DataRequired()])
