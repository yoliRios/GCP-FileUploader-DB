# Description: Dockerfile for the frontend service
FROM node:18-alpine

# Create app directory   
WORKDIR /app

# Install app dependencies
COPY . .

# Bundle app source
RUN npm install
RUN npm run build

#  Expose the port the app runs in
ENTRYPOINT [ "npm", "run", "start" ]