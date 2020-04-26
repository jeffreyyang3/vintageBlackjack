from jeffreyyang0/vintage_blackjack:front as build_stage
run yarn build

from nginx
copy --from=build_stage /app/dist /etc/nginx/html
copy ./default.conf ./etc/nginx/conf.d/default.conf
cmd ["nginx", "-g", "daemon off;"]
