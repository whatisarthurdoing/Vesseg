from enum import unique
from pyparsing import nullDebugAction
from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, PrimaryKeyConstraint, String, DateTime
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    projects = relationship("Project", back_populates="owner")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    status = Column(String, index=True, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    model = Column(Integer, nullable = False, default = 0) # 0 = No model chosen, 1 = nnunet, 2 = fastai

    owner = relationship("User", back_populates="projects")
    images = relationship("Image", back_populates="projects")


class Image(Base): 
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    name = Column(String, nullable=False)
    file_type = Column(Integer, nullable=False)
    original_width = Column(Integer)
    original_height = Column(Integer)
    resized_width = Column(Integer)
    resized_height = Column(Float)
    y_length = Column(Float)
    x_length_unit = Column(String) 
    y_length_unit = Column(String)
    preprocessed = Column(Boolean, default = False, nullable=False)

    masks = relationship("PredictionModel", back_populates= "images")
    projects = relationship("Project", back_populates = "images")


class PredictionModel(Base):
    __tablename__ = "predictionmodel"

    id = Column(Integer, primary_key = True, index = True)
    name = Column(String, unique = True, nullable = False)
    container = Column(String, unique = False, nullable = False)
    model_path = Column(String, nullable = False)
    additional_arguments = Column(String, nullable = False)
    # created_on = Column(DateTime, nullable = False, default = datetime.utcnow)
    masks = relationship("Image", back_populates = "predictionmodel")


class Mask(Base): 
    __tablename__ = "mask"
    
    id = Column(Integer, primary_key = True, index = True)
    mask = Column(String, nullable = False)
    image_id = Column(Integer, ForeignKey("images.id"), nullable = False)
    predictionmodel_id = Column(Integer, ForeignKey("predictionmodel.id"), nullable = False)
    background_pixels = Column(Integer)
    plaque_pixels = Column(Integer)
    lumen_pixels = Column(Integer)
    evaluation = Column(Integer)
    # evaluated_on = Column(DateTime, default = datetime.utcnow)
    # created_on = Column(DateTime, default = datetime.utcnow)



# TODO: Spezifiziere Ablauf eines Tasks und seine Zustaende
class Task(Base): 
    __tablename__ = "task"

    id = Column(Integer, primary_key = True, index = True)
    name = Column(String, index = True)
    task_queue = Column(String, nullable = False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable = False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable = False)
    status = Column(String, nullable = False, default = "TODO")