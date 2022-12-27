# prepare machine
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3000

# pull server
git checkout master && git pull

# run proxy server:
cd .. && npm install && tmux new-session -d -s my_session 'npm run server'
# tmux npm run server