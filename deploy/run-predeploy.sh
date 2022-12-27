# create staging build
cd ../react-app && MARKER=staging node ./envs/create-env.js && npm install && npm run build