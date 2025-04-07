FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json

RUN npm install

COPY . .

RUN npm run build-all

# Second stage for final image
FROM node:16-alpine

# Copy required folders from first stage
COPY --from=builder /app/package*.json .
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/views ./views

# Install dependencies for the application with pm2 to start the applicaion
RUN npm ci --omit=dev && npm install -g pm2

# Environment variables needed for the application to start
ENV DB_HOST=localhost
ENV USER=user
ENV USER_PASS=pass
ENV DB_NAME=testdb

EXPOSE 3000

CMD ["pm2-runtime", "start", "./build/server.js", "--name", "app"]

