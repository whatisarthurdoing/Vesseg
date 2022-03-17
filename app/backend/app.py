from flask import Flask, render_template, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError


app = Flask(__name__)
#creates database instance
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
#TODO: Configure secret key for production
app.config['SECRET_KEY'] = 'thisisasecretkey'

#TODO: Docstrings

class User(db.Model, UserMixin): 
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

class RegistrationForm(FlaskForm): 
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Password"})
    submit = SubmitField("Register")

    def validate_username(self, username): 
        existing_user_username = User.query.filter_by(username=username.data).first()
        if existing_user_username: 
            raise ValidationError(
                "That username already exists. Please choose a different one."
            )

class LoginForm(FlaskForm): 
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Password"})
    submit = SubmitField("Login")

class ResetPasswordForm(FlaskForm): 
    #TODO: validators fuer E-Mail ansehen
    email = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "E-Mail"})
    submit = SubmitField("Submit")

class NewPasswordForm(FlaskForm): 
    #TODO: Durchgehen ob die Spezifikationen Sinn machen
    password = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "New password"})
    confirm_password = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Confirm Password"})
    submit = SubmitField("Submit")

@app.route('/')
def start(): 
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login(): 
    form = LoginForm()
    return render_template('login.html', form=form)

@app.route('/fpassword', methods=['GET', 'POST'])
def fpassword():
    form = ResetPasswordForm()
    return render_template('forgotpassword.html', form=form)

@app.route('/cpassword', methods=['GET', 'POST'])
def cpassword():
    form = NewPasswordForm()
    return render_template('changepassword.html', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register(): 
    form = RegistrationForm()
    return render_template('register.html', form=form)

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/howto')
def howto(): 
    return render_template('howto.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

if __name__ == '__main__': 
    app.run(debug=True)