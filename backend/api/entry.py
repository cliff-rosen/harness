import logging
from db import local_db as db

def insert_entry(content):
    db.insert_entry(content)

def get_entries():
    rows = db.get_entries()
    return rows

