FROM registry.access.redhat.com/ubi8/nodejs-18 as build

WORKDIR /usr/src/app

COPY --chown=1001:0 package*.json .
RUN npm ci --omit=dev

COPY --chown=1001:0 . .

# Default values for environment variables
ENV FASTIFY_PORT      '8080'
ENV FASTIFY_ADDRESS   '0.0.0.0'
ENV FASTIFY_LOG_LEVEL 'info'

# Start the application using the fastify cli 
CMD ./node_modules/.bin/fastify start -l info app.js