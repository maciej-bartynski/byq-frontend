# create staging build
cd ../react-app && MARKER=staging node ./envs/create-env.js && npm install && npm run build

# deploy staging front build:
cd ../deploy && scp -i ./byqstaging.pem -r ./../react-app/build ubuntu@ec2-3-72-231-170.eu-central-1.compute.amazonaws.com:byq-frontend/react-app

# deploy certs
scp -i ./byqstaging.pem -r ./../cert ubuntu@ec2-3-72-231-170.eu-central-1.compute.amazonaws.com:byq-frontend