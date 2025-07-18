FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install -f

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 9000

# Command to run the application
CMD ["npm", "start"]