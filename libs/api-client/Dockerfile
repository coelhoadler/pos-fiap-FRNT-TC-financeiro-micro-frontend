FROM node:22-alpine

# Set the working directory
WORKDIR /lib

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install -f

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 8504

# Command to run the application
CMD ["npm", "run", "start"]