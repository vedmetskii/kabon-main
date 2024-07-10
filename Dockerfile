FROM node:20.10.0

WORKDIR /project/

COPY package*.json /project/

RUN npm install --production

COPY . /project/

RUN npm run build

EXPOSE 3000

CMD "npx prisma migrate deploy", "npm run seed", "npm run start"