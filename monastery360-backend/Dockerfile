# Use the official Node.js 18 LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S monastery360 -u 1001

# Change ownership of the app directory
RUN chown -R monastery360:nodejs /app

# Switch to non-root user
USER monastery360

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["npm", "start"]