from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    # Database configuration
    db_host: str = Field(..., env='DB_HOST')
    db_port: str = Field(..., env='DB_PORT')
    db_user: str = Field(..., env='DB_USER')
    db_password: str = Field(..., env='DB_PASSWORD')
    db_name: str = Field(..., env='DB_NAME')
    db_url: str = Field(..., env='DB_URL')
    SECRET_KEY: str = Field(..., env='SECRET_KEY')
    ALGORITHM: str = Field(..., env='ALGORITHM')
    ACCESS_TOKEN_EXPIRE_MINUTES: str = Field(..., env='ACCESS_TOKEN_EXPIRE_MINUTES')


    # Application settings
    app_name: str = Field('MyApp', env='APP_NAME')
    app_version: str = Field('1.0.0', env='APP_VERSION')
    class config:
        env_file = ".env"
        #env_file_encoding = "utf-8"
settings = Settings()