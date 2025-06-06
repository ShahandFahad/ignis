# Use official Node.js base image
From node:18-alpine

# Create app directory
WORKDIR /app


# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose app port
EXPOSE 5050

# Start application
CMD ["npm", "start"]



