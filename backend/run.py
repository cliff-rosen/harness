import db.local_db as db

try:
    db.insert_entry('this is another entry')
except Exception as e:
    print("***************************")
    print("DB error in insert_entry")
    print(e)

