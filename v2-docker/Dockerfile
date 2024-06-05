FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
 
ENV PORT=3000

EXPOSE 3000

# CMD ["./wait.sh", "db","--",  "npm", "start"]

CMD ["npm", "start"]