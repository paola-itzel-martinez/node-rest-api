const fs = require('fs');

const PATHS = {
    ERROR: './logs/errors.txt'
};

const saveDB = ({ type, data }) => {
    const path = PATHS[type]
    fs.writeFileSync(path, JSON.stringify(data));
};

module.exports = {
    saveDB
}
