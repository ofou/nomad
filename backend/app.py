#!/usr/bin/env python3
import json
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import sys

# Add current directory to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

class WorkHolidayHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse URL and query parameters
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        query_params = parse_qs(parsed_url.query)
        
        # Set CORS headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        try:
            if path == '/api/nationalities':
                response = self.get_nationalities()
            elif path == '/api/programs':
                nationality = query_params.get('nationality', [''])[0]
                response = self.get_programs(nationality)
            else:
                response = {'error': 'Endpoint not found'}
                self.send_response(404)
            
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            error_response = {'error': str(e)}
            self.wfile.write(json.dumps(error_response).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def load_programs(self):
        try:
            with open('../data/programs.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return []
    
    def get_nationalities(self):
        programs = self.load_programs()
        nationalities = set()
        
        for program in programs:
            for nationality in program.get('eligible_nationalities', []):
                nationalities.add(nationality)
        
        return sorted(list(nationalities))
    
    def get_programs(self, nationality=''):
        programs = self.load_programs()
        
        if nationality:
            # Filter programs by nationality
            filtered_programs = []
            for program in programs:
                if nationality.lower() in [n.lower() for n in program.get('eligible_nationalities', [])]:
                    filtered_programs.append(program)
            return filtered_programs
        
        return programs

def run_server():
    server_address = ('', 5001)
    httpd = HTTPServer(server_address, WorkHolidayHandler)
    print("🚀 Starting Work & Holiday Platform Backend...")
    print("🌐 Server running at: http://localhost:5001")
    print("📡 API endpoints:")
    print("   - GET /api/nationalities")
    print("   - GET /api/programs?nationality=<country>")
    print("")
    print("Press Ctrl+C to stop the server")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
