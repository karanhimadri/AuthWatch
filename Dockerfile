# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose port Cloud Run uses
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
