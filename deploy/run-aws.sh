# prepare machine
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3000

# deploy staging front build:
scp -i ./byqstaging.pem -r ./../react-app/build ubuntu@ec2-3-72-231-170.eu-central-1.compute.amazonaws.com:byq-frontend/react-app

# pull server
git checkout master && git pull

# run proxy server:
MARKER=staging node ../envs/create-env.js && npm install && tmux && node ./server.js