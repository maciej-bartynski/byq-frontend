# prepare machine
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3000

# pull server
git checkout master && git pull

# run proxy server:
MARKER=staging node ../envs/create-env.js && npm install && tmux && node ./server.js