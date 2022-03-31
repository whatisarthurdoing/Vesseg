from flask import Flask, render_template, request, session, url_for, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_required, login_user, logout_user, current_user, user_loaded_from_request
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, EmailField
from wtforms.validators import InputRequired, Length, ValidationError, DataRequired, Email, EqualTo, Length
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

api = Flask(__name__)

db = SQLAlchemy(api)
migrate = Migrate(api, db)
bcrypt = Bcrypt(api)
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


#TODO: Configure secret key for production
api.config["SECRET_KEY"] = 'you-will-never-guess'

login_manager = LoginManager()
login_manager.init_app(api)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_id): 
    return User.query.get(int(user_id))


# Tables
class User(db.Model, UserMixin): 
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text(80), nullable=False, unique=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    #lastSess = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
'''
class Project(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    #images = db.relationship('Image', backref='project', cascade='save-update, merge, delete, delete-orphan')
    status = db.Column(db.String(80), nullable = False)
'''



# Forms
class RegistrationForm(FlaskForm): 
    email = EmailField(validators=[InputRequired()], render_kw={"placeholder": "E-Mail"})
    #email = StringField('email', validators=[DataRequired(), Email(message='Enter a valid email.')])
    username = StringField(validators=[InputRequired(), Length(min=4, max=40)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
    confirm = PasswordField(validators=[InputRequired(), EqualTo('password', message='Passwords must match.')], render_kw={"placeholder": "Confirm password"})
    submit = SubmitField("Register")

    def validate_username(self, username): 
        existing_user_username = User.query.filter_by(username=username.data).first()
        if existing_user_username: 
            raise ValidationError(
                "That username already exists. Please choose a different one."
            )

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('Please use a different email address.')
class LoginForm(FlaskForm): 
    username = StringField(validators=[InputRequired(), Length(min=4, max=40)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
    submit = SubmitField("Login")

class ResetPasswordForm(FlaskForm): 
    #TODO: validators fuer E-Mail ansehen
    email = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "E-Mail"})
    submit = SubmitField("Submit")

class NewPasswordForm(FlaskForm): 
    password = StringField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "New password"})
    confirm = PasswordField(validators=[DataRequired(), EqualTo('password', message='Passwords must match.')], render_kw={"placeholder": "Confirm password"})
    submit = SubmitField("Submit")




@api.route('/')
def start(): 
    return render_template('index.html')

@api.route('/login', methods=['GET', 'POST'])
def login(): 
    form = LoginForm()
    if form.validate_on_submit(): 
        user = User.query.filter_by(username=form.username.data).first()
        if user: 
            if bcrypt.check_password_hash(user.password, form.password.data): 
                login_user(user)
                return redirect(url_for('projects'))
    return render_template('login.html', form=form)

@api.route('/fpassword', methods=['GET', 'POST'])
def fpassword():
    form = ResetPasswordForm()
    return render_template('forgotpassword.html', form=form)

@api.route('/email')
def email(): 
    return render_template('email.html')

@api.route('/cpassword', methods=['GET', 'POST'])
def cpassword():
    form = NewPasswordForm()
    return render_template('changepassword.html', form=form)

@api.route('/register', methods=['GET', 'POST'])
def register(): 
    form = RegistrationForm()

    if form.validate_on_submit(): 
        hashed_password = bcrypt.generate_password_hash(form.password.data)
        new_user = User(email=form.email.data, username=form.username.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit() 
        return redirect(url_for('login'))

    return render_template('register.html', form=form)

@api.route('/projects', methods=['GET', 'POST'])
@login_required
def projects():
    return render_template('projects.html')

@api.route('/projects/new')
@login_required
def new_project(): 
    return render_template('newproject.html')

@api.route('/about')
def about():
    return render_template('about.html')

@api.route('/howto')
@login_required
def howto(): 
    return render_template('howto.html')

@api.route('/settings', methods=['GET', 'POST'])
def settings():
    return render_template('settings.html')

@api.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@api.route('/impressum')
def impressum(): 
    return render_template('impressum.html')

if __name__ == '__main__': 
    api.run(debug=True)