from node:alpine
workdir "/app"
copy ./package.json ./
# run yarn global add nodemon
run yarn
copy . .
cmd ["yarn", "start"]
# cmd ["nodemon"]

