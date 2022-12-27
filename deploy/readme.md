# Helper materials:
1. https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html
2. SSL: https://manage.sslforfree.com/certificate/install/d9e72d371b3ade65e9998558cfe3bb31

# Creating local certs:
1. "certs": " openssl req -nodes -new -x509 -keyout finance.key -out finance.cert",
2. "certs1": "openssl genrsa -out finance.key 2048",
3. "certs2": "openssl req -new -x509 -key finance.key -out finance.cert -days 3650 -subj /CN=finance.dev",
4. "certs3": "openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem",

# Running stg:
once:
1. make deploy-backend-booster
2. ssh-into
3. cd byq-monorepo
4. npm run xbg-echo
every time:
1. cd <frontend-directory>
2. npm run build
3. make deploy-front
4. ssh-into
5. sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
6. sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3000
7. cd byq-monorepo
8. npm run start