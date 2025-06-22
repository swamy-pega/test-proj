from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    return pwd_context.hash(password)
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)
def get_hashed_password(password: str) -> str:
    """Get the hashed password."""
    return hash_password(password)
def check_password_strength(password: str) -> bool:
    """Check if the password meets strength requirements."""
    # Example: Check if the password is at least 8 characters long
    return len(password) >= 8