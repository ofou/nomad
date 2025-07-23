.PHONY: start stop install clean

start: install
	@echo "🚀 Starting Work & Holiday Platform..."
	@echo "📦 Starting Python backend..."
	@cd backend && source ../.venv/bin/activate && python app.py & echo $$! > ../backend.pid
	@sleep 3
	@echo "⚛️  Starting React frontend..."
	@cd frontend && npm start & echo $$! > ../frontend.pid
	@echo "✅ Platform is starting up!"
	@echo "🌐 Frontend: http://localhost:3000"
	@echo "🔧 Backend: http://localhost:5001"
	@echo ""
	@echo "Press Ctrl+C to stop both servers or run 'make stop'"

stop:
	@echo "🛑 Stopping servers..."
	@if [ -f backend.pid ]; then kill `cat backend.pid` 2>/dev/null || true; rm backend.pid; fi
	@if [ -f frontend.pid ]; then kill `cat frontend.pid` 2>/dev/null || true; rm frontend.pid; fi
	@echo "✅ Servers stopped"

install:
	@echo "📦 Installing dependencies..."
	@if [ ! -d .venv ]; then python3 -m venv .venv; fi
	@cd backend && source ../.venv/bin/activate && pip install -r requirements.txt
	@cd frontend && npm install --legacy-peer-deps
	@echo "✅ Dependencies installed"

clean:
	@echo "🧹 Cleaning up..."
	@rm -rf .venv
	@cd frontend && rm -rf node_modules
	@if [ -f backend.pid ]; then rm backend.pid; fi
	@if [ -f frontend.pid ]; then rm frontend.pid; fi
	@echo "✅ Cleanup complete" 