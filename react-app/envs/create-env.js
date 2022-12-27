const fs = require('fs');

const envsMap = {
  local: 'local',
  staging: 'staging'
}

fs.copyFile(`${__dirname}/env.${envsMap[process.env.MARKER]}`, `${__dirname}/../.env`, (err) => {
  if (err) throw err;
});