FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables
ENV REACT_APP_API_URL=http://localhost:5001
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

# Install curl for health check
RUN apk add --no-cache curl

# Start the development server
CMD ["npm", "start"]