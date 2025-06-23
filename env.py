from alembic import context
from models import Base
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from config import settings

config = context.config
#config.set_main_option("sqlalchemy.url", "postgresql://postgres:password@localhost:5432/postgres")  

temp=settings.db_host
config.set_main_option("sqlalchemy.url", "postgresql://{settings.db_user}:{settings.db_password}@{settings.db_host}:{settings.db_port}/{settings.db_name}")  
fileConfig = config.config_file_name
if fileConfig is not None:
    
    fileConfig(fileConfig)

target_metadata = Base.metadata

sqlalchemy_url = config.get_main_option("sqlalchemy.url")