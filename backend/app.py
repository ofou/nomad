from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Path to data file
DATA_FILE = Path(__file__).parent.parent / "data" / "programs.json"

def load_programs():
    """Load programs from JSON file"""
    try:
        if DATA_FILE.exists():
            with open(DATA_FILE, 'r') as f:
                return json.load(f)
        return []
    except Exception as e:
        print(f"Error loading programs: {e}")
        return []

def save_programs(programs):
    """Save programs to JSON file"""
    try:
        # Ensure data directory exists
        DATA_FILE.parent.mkdir(exist_ok=True)
        with open(DATA_FILE, 'w') as f:
            json.dump(programs, f, indent=2)
        return True
    except Exception as e:
        print(f"Error saving programs: {e}")
        return False

@app.route('/api/programs', methods=['GET'])
def get_programs():
    """Get all programs"""
    try:
        programs = load_programs()
        
        # Filter by search query if provided
        search = request.args.get('search', '').lower()
        if search:
            filtered_programs = []
            for program in programs:
                if (search in program.get('country', '').lower() or 
                    search in program.get('title', '').lower() or
                    search in program.get('description', '').lower()):
                    filtered_programs.append(program)
            programs = filtered_programs
        
        return jsonify({'programs': programs})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/programs', methods=['POST'])
def add_program():
    """Add a new program"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['country', 'title', 'description', 'duration', 'requirements']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        programs = load_programs()
        
        # Generate ID
        new_id = max([p.get('id', 0) for p in programs], default=0) + 1
        
        # Create new program
        new_program = {
            'id': new_id,
            'country': data['country'],
            'title': data['title'],
            'description': data['description'],
            'duration': data['duration'],
            'requirements': data['requirements'],
            'eligibleCountries': data.get('eligibleCountries', []),
            'ageLimit': data.get('ageLimit', ''),
            'website': data.get('website', ''),
            'createdAt': data.get('createdAt', '')
        }
        
        programs.append(new_program)
        
        if save_programs(programs):
            return jsonify({'program': new_program}), 201
        else:
            return jsonify({'error': 'Failed to save program'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/programs/<int:program_id>', methods=['DELETE'])
def delete_program(program_id):
    """Delete a program"""
    try:
        programs = load_programs()
        programs = [p for p in programs if p.get('id') != program_id]
        
        if save_programs(programs):
            return jsonify({'message': 'Program deleted successfully'})
        else:
            return jsonify({'error': 'Failed to delete program'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Work & Holiday Platform API is running'})

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    print(f"🚀 Starting Work & Holiday Platform API on port {port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"📁 Data file: {DATA_FILE}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)