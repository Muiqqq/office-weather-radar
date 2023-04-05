FROM node:16.20-alpine3.16

WORKDIR /usr/src/app

EXPOSE 8080

# Non-secret env vars to persist that are used by the app
ENV NODE_ENV=production
ENV API_BASE_URL=https://api.openweathermap.org/data/2.5/
ENV API_KEY_NAME=appid

COPY . .

# Install dependencies
RUN npm install

# Create production build
RUN npm run build

# Start the server as entrypoint
ENTRYPOINT [ "npm", "run", "server-start" ]
