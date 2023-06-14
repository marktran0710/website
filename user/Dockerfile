# Base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port on which the application will run
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]
