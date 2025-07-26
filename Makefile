.PHONY: install start stop clean backend frontend

install:
	@echo "📦 Installing dependencies..."
	@cd backend && pip install -r requirements.txt
	@cd frontend && npm install
	@echo "✅ Dependencies installed"

start:
	@echo "🚀 Starting Work & Holiday Platform..."
	@echo "📦 Starting Python backend..."
	@cd backend && python app.py &
	@echo "⚛️  Starting React frontend..."
	@cd frontend && npm start &
	@echo "✅ Platform is starting up!"
	@echo "🌐 Frontend: http://localhost:3000"
	@echo "🔧 Backend: http://localhost:5001"
	@echo ""
	@echo "Press Ctrl+C to stop both servers or run 'make stop'"

stop:
	@echo "🛑 Stopping servers..."
	@pkill -f "python app.py" || true
	@pkill -f "react-scripts start" || true
	@echo "✅ Servers stopped"

backend:
	@echo "📦 Starting Python backend only..."
	@cd backend && python app.py

frontend:
	@echo "⚛️  Starting React frontend only..."
	@cd frontend && npm start

clean:
	@echo "🧹 Cleaning up..."
	@cd backend && find . -name "*.pyc" -delete
	@cd backend && find . -name "__pycache__" -delete
	@cd frontend && rm -rf node_modules
	@echo "✅ Cleanup complete"