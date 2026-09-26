import os
from libsql import connect

def get_connection():
    return connect(os.getenv('DATABASE_URL', 'file:../db/dev.db'))
