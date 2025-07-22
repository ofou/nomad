try:
    from flask import Flask, jsonify, request
    from flask_cors import CORS
except ImportError:
    print("Installing required packages...")
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "flask", "flask-cors", "--break-system-packages"])
    from flask import Flask, jsonify, request
    from flask_cors import CORS

import json
import os

app = Flask(__name__)
CORS(app)

# Load program data
def load_programs():
    try:
        with open('../data/programs.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

@app.route('/api/programs', methods=['GET'])
def get_programs():
    nationality = request.args.get('nationality', '').lower()
    programs = load_programs()
    
    if nationality:
        # Filter programs by nationality
        filtered_programs = []
        for program in programs:
            if nationality in [n.lower() for n in program.get('eligible_nationalities', [])]:
                filtered_programs.append(program)
        return jsonify(filtered_programs)
    
    return jsonify(programs)

@app.route('/api/nationalities', methods=['GET'])
def get_nationalities():
    programs = load_programs()
    nationalities = set()
    
    for program in programs:
        for nationality in program.get('eligible_nationalities', []):
            nationalities.add(nationality)
    
    return jsonify(sorted(list(nationalities)))

@app.route('/api/programs/<program_id>', methods=['GET'])
def get_program(program_id):
    programs = load_programs()
    for program in programs:
        if program.get('id') == program_id:
            return jsonify(program)
    return jsonify({'error': 'Program not found'}), 404

if __name__ == '__main__':
    print("Starting Work & Holiday Platform Backend...")
    print("API will be available at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
