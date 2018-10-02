import logging
from flask import Flask, request, jsonify
from sql_layer import add_piece, get_all_pieces, get_piece, edit_piece
from flask_cors import CORS

# create logger with 'spam_application'
logger = logging.getLogger('information')
logger.setLevel(logging.DEBUG)
fh = logging.FileHandler('information_api.log')
fh.setLevel(logging.DEBUG)
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter(
    '%(asctime)s - [%(name)s/%(funcName)s] - %(levelname)s - %(message)s')
fh.setFormatter(formatter)
ch.setFormatter(formatter)
logger.addHandler(fh)
logger.addHandler(ch)

app = Flask(__name__)
CORS(app)


@app.route('/pieces', methods=['GET'])
def get_all():
    pieces = get_all_pieces()
    return jsonify(pieces)


@app.route('/pieces/<piece_id>', methods=['GET'])
def get(piece_id):
    return jsonify(get_piece(piece_id))


required_fields = ["location_name", "description", "audio_url", "image_url"]

# location_name, description, audio_url, image_url
@app.route('/pieces', methods=['POST'])
def add():
    piece_json = request.get_json()
    for field in required_fields:
        if field not in piece_json:
            return jsonify({
                'success': False,
                'message': f"Field {field} is missing!"
            })
    try:
        add_piece(piece_json)
        return jsonify({
            'success': True,
            'message': "Piece created succesfully!"
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        })

@app.route('/pieces/<piece_id>', methods=['PUT'])
def put(piece_id):
    piece_json = request.get_json()
    for field in required_fields:
        if field not in piece_json:
            return jsonify({
                'success': False,
                'message': f"Field {field} is missing!"
            })
    try:
        edit_piece(piece_id, piece_json)
        return jsonify({
            'success': True,
            'message': "Piece edited succesfully!"
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        })


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8003)
