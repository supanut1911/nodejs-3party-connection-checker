FROM --platform=linux/amd64 node:20-alpine

RUN mkdir -p /home/app

COPY ./app /home/app

# default dir that next command execute in /home/app dir
WORKDIR /home/app 

# run npm install in /home/app
RUN npm install



EXPOSE 4455

# not cd to folder becase of WORKDIR
CMD ["node", "index.js"]
