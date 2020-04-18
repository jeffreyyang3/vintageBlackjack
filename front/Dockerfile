from node:alpine
workdir "/app"
copy ./package.json ./
run yarn
copy . .
cmd ["yarn", "serve"]
