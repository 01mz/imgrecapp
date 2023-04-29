FROM node:14.15.4-slim

#RUN npm install --build-from-source zeromq@6.0.0-beta.5 

RUN mkdir -p /app
WORKDIR /app

COPY package.json package.json
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
#CMD ["npm", "run", "dev"]

