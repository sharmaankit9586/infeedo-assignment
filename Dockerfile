FROM node:16

WORKDIR /usr/../app

COPY package*.json ./

COPY . .
RUN npm install
RUN npm test
RUN npm run build
ENV PORT=8081
ENV TZ=Asia/Kolkata
EXPOSE 8081
CMD [ "npm", "start" ]