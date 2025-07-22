# Work & Holiday Platform

A comprehensive platform that allows users to discover available work and holiday programs based on their nationality.

## Features

- 🔍 Search work and holiday programs by nationality
- 📋 Detailed program information including requirements, duration, and benefits
- 🎨 Modern, responsive user interface
- 🌍 Support for multiple countries and programs
- ⚡ Fast and efficient search functionality
- 📱 Mobile-friendly design

## Project Structure

```
├── backend/          # Python Flask API
│   ├── app.py       # Main Flask application
│   └── requirements.txt
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
├── data/            # Sample program data
│   └── programs.json
└── README.md
```

## Available Programs

The platform includes information about work and holiday programs from:

- 🇦🇺 Australia Working Holiday Visa
- 🇳🇿 New Zealand Working Holiday Visa
- 🇨🇦 Canada International Experience Canada
- 🇬🇧 UK Youth Mobility Scheme
- 🇯🇵 Japan Working Holiday Visa
- 🇰🇷 South Korea Working Holiday Visa

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask server:
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /api/programs` - Get all programs (optional query parameter: `nationality`)
- `GET /api/nationalities` - Get list of all eligible nationalities
- `GET /api/programs/<id>` - Get specific program by ID

## Usage

1. Open the application in your browser
2. Enter your nationality in the search field
3. View available work and holiday programs
4. Click on programs to see detailed information

## Technologies Used

- **Backend**: Python, Flask, Flask-CORS
- **Frontend**: React, TypeScript, Tailwind CSS
- **Data**: JSON-based program database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
