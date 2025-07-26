.PHONY: install start stop clean backend frontend build logs restart status health

# Check if Docker and Docker Compose are installed
check-docker:
	@which docker > /dev/null || (echo "❌ Docker is not installed. Please install Docker first." && exit 1)
	@docker compose version > /dev/null 2>&1 || (echo "❌ Docker Compose is not installed. Please install Docker Compose first." && exit 1)
	@echo "✅ Docker and Docker Compose are available"

install: check-docker
	@echo "📦 Building Docker containers and installing dependencies..."
	@docker compose build
	@echo "✅ Dependencies installed and containers built"

build: check-docker
	@echo "🔨 Building Docker containers..."
	@docker compose build --no-cache
	@echo "✅ Containers built successfully"

start: check-docker
	@echo "🚀 Starting Work & Holiday Platform with Docker..."
	@docker compose up -d
	@echo "✅ Platform is starting up!"
	@echo "🌐 Frontend: http://localhost:3000"
	@echo "🔧 Backend: http://localhost:5001"
	@echo ""
	@echo "💡 Use 'make logs' to view logs"
	@echo "💡 Use 'make stop' to stop all services"
	@echo "💡 Use 'make status' to check service status"

stop: check-docker
	@echo "🛑 Stopping all services..."
	@docker compose down
	@echo "✅ All services stopped"

restart: check-docker
	@echo "🔄 Restarting Work & Holiday Platform..."
	@docker compose restart
	@echo "✅ Platform restarted"

backend: check-docker
	@echo "📦 Starting backend service only..."
	@docker compose up -d backend
	@echo "✅ Backend service started"

frontend: check-docker
	@echo "⚛️  Starting frontend service only..."
	@docker compose up -d frontend
	@echo "✅ Frontend service started"

logs: check-docker
	@echo "📋 Showing logs for all services..."
	@docker compose logs -f

logs-backend: check-docker
	@echo "📋 Showing backend logs..."
	@docker compose logs -f backend

logs-frontend: check-docker
	@echo "📋 Showing frontend logs..."
	@docker compose logs -f frontend

status: check-docker
	@echo "📊 Service Status:"
	@docker compose ps

health: check-docker
	@echo "🏥 Health Check:"
	@docker compose ps --format "table {{.Service}}\t{{.Status}}\t{{.Ports}}"

clean: check-docker
	@echo "🧹 Cleaning up Docker resources..."
	@docker compose down -v --remove-orphans
	@docker system prune -f
	@echo "✅ Cleanup complete"

clean-all: check-docker
	@echo "🧹 Deep cleaning all Docker resources..."
	@docker compose down -v --remove-orphans --rmi all
	@docker system prune -af --volumes
	@echo "✅ Deep cleanup complete"

dev: check-docker
	@echo "🔧 Starting in development mode with live logs..."
	@docker compose up

shell-backend: check-docker
	@echo "🐚 Opening shell in backend container..."
	@docker compose exec backend /bin/bash

shell-frontend: check-docker
	@echo "🐚 Opening shell in frontend container..."
	@docker compose exec frontend /bin/sh

help:
	@echo "🆘 Available commands:"
	@echo "  make install     - Build containers and install dependencies"
	@echo "  make build       - Build Docker containers from scratch"
	@echo "  make start       - Start all services in background"
	@echo "  make stop        - Stop all services"
	@echo "  make restart     - Restart all services"
	@echo "  make backend     - Start backend service only"
	@echo "  make frontend    - Start frontend service only"
	@echo "  make logs        - Show logs for all services"
	@echo "  make logs-backend - Show backend logs only"
	@echo "  make logs-frontend - Show frontend logs only"
	@echo "  make status      - Show service status"
	@echo "  make health      - Show health status"
	@echo "  make dev         - Start in development mode with live logs"
	@echo "  make clean       - Clean up Docker resources"
	@echo "  make clean-all   - Deep clean all Docker resources"
	@echo "  make shell-backend - Open shell in backend container"
	@echo "  make shell-frontend - Open shell in frontend container"
	@echo "  make help        - Show this help message"