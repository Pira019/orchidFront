FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server 
 
WORKDIR /client-orchid

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders
COPY . /client-orchid

# build app for production with minification
RUN npm run dev

EXPOSE 30000
CMD [ "http-server", "dist" ]