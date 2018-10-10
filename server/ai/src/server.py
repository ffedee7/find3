import os
import time
import base58
import logging

from expiringdict import ExpiringDict


# create logger with 'spam_application'
logger = logging.getLogger('server')
logger.setLevel(logging.DEBUG)
fh = logging.FileHandler('server.log')
fh.setLevel(logging.DEBUG)
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter(
    '%(asctime)s - [%(name)s/%(funcName)s] - %(levelname)s - %(message)s')
fh.setFormatter(formatter)
ch.setFormatter(formatter)
logger.addHandler(fh)
logger.addHandler(ch)


from flask import Flask, request, jsonify
app = Flask(__name__)


from learn import AI

ai_cache = ExpiringDict(max_len=100000, max_age_seconds=60)


def to_base58(family):
    return base58.b58encode(family.encode('utf-8')).decode('utf-8')


@app.route('/classify', methods=['POST'])
def classify():
    t = time.time()

    payload = request.get_json()
    if payload is None:
        return jsonify({'success': False, 'message': 'must provide sensor data'})

    if 'sensor_data' not in payload:
        return jsonify({'success': False, 'message': 'must provide sensor data'})

    fname = to_base58(payload['sensor_data']['f']) + ".ai"

    ai = ai_cache.get(payload['sensor_data']['f'])
    if ai is None:
        ai = AI(to_base58(payload['sensor_data']['f']))
        logger.debug("loading {}".format(fname))
        try:
            ai.load(fname)
        except Exception:
            return jsonify({"success": False, "message": "could not find '{p}'".format(p=fname)})
        ai_cache[payload['sensor_data']['f']] = ai

    classified = ai.classify(payload['sensor_data'])

    logger.debug("classifed for {} {:d} ms".format(
        payload['sensor_data']['f'], int(1000 * (t - time.time()))))
    return jsonify({"success": True, "message": "data analyzed", 'analysis': classified})


@app.route('/learn', methods=['POST'])
def learn():
    payload = request.get_json()
    family = 'posifi'
    if payload is None:
        return jsonify({'success': False, 'message': 'must provide sensor data'})
    if 'csv_file' not in payload:
        return jsonify({'success': False, 'message': 'must provide CSV file'})

    ai = AI(to_base58(family))
    try:
        ai.learn(payload['csv_file'])
    except Exception as e:
        return jsonify({"success": False, "message": f"ERROR learning {e}"})

    ai.save(to_base58(family) + ".ai")
    ai_cache[family] = ai
    return jsonify({"success": True, "message": "calibrated data"})


if __name__ == "__main__":
    app.run(host='0.0.0.0')
