# Use node:18 as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Set read and write permissions recursively for all files and directories
RUN chmod -R 777 .

# Expose port 3002
EXPOSE 3002

# Start the Node.js application
CMD ["npm", "start"]
