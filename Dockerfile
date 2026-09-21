FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src

CMD ["node", "src/validate_sonarqube.js"]