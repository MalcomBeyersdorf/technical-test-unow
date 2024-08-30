FROM node:alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
COPY . .
EXPOSE 4200
CMD ["sh", "-c", "npm run start:local"]

