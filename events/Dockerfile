#Install the base image
FROM node:alpine

WORKDIR /app
#Install all the packages
COPY ./package.json /app
RUN npm install
COPY ./ ./

#Run Command
CMD [ "npm","start" ]