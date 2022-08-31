from fastapi import HTTPException, status


CREDENTIAL_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

INACTIVE_USER = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Inactive user"
)

INCORRECT_USERNAME_PASSWORD = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect username or password",
    headers={"WWW-Authenticate": "Bearer"},
)

USER_EXISTS = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST, 
    detail="Username already registered"
)

USER_DOES_NOT_EXIST = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND, 
    detail="User not found"
)