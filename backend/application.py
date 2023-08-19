import time
from flask import Flask, request
from flask_restful import Resource, Api, reqparse, abort
from flask_cors import CORS
from api import entry
from api.errors import InputError
from utils.utils import decode_token
import logging

MAX_TOKENS_DEFAULT = 200
TEMPERATURE_DEFAULT = .4

LOG_LEVEL = logging.INFO
logging.basicConfig(format='%(asctime)s  %(levelname)s - %(message)s',
                    level=LOG_LEVEL, filename='app.log', filemode='w')
logger = logging.getLogger()

application = Flask(__name__)
CORS(application)

logger.info('Initializing application...')

parser = reqparse.RequestParser()
parser.add_argument('domain_id', type=int)


def authenticate():
    return True
    auth_header = request.headers.get('Authorization')
    if auth_header:
        try:
            auth_token = auth_header.split(" ")[1]
            decoded_token = decode_token(auth_token)
            # print(decoded_token)
            if 'error' in decoded_token:
                return False
        except IndexError:
            return False
    else:
        return False
    return True


"""
@app.route('/hello', methods=['POST'])
def hello():
    print(request.json)
    return 'Hello!'
"""

class Hello(Resource):
    def get(self):
        print(request.get_data())
        return "hello"

class Entry(Resource):
    def get(self):
        try:
            res = entry.get_entries()
        except Exception as e:
            abort(400)
        return {'status': 'SUCCESS', 'data': res}
    
    def post(self):
        logger.debug('Entry post')

        if not authenticate():
            logger.warning('Conversation - Authentication failure')
            abort(401)
            # return {"status": "INVALID_TOKEN"}

        try:
            data = None
            data = request.get_json()
            content = data['content']
        except Exception as e:
            data_str = str(data) if data else 'NO_DATA_PARSED'
            logger.warning('Entry - Error parsing body: ' + data_str)
            abort(400)

        try:
            entry.insert_entry(content)
        except InputError as e:
            logger.warning('InputError in Entry: %s', e)
            abort(400, message=str(e))
        except Exception as e:
            logger.error('Uncaught exception in Entry.post: %s', e)
            abort(500)

        return {'status': 'SUCCESS'}


api = Api(application)
api.add_resource(Hello, '/hello')
api.add_resource(Entry, '/entries')

if __name__ == '__main__':
    application.run(debug=True)
