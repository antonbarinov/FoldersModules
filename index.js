const fs = require('fs');
const path = require('path');

function walkSync(currentDirPath, callback) {
    try {
        const files = fs.readdirSync(currentDirPath);

        for (let i = 0; i < files.length; i++) {
            const name = files[i];
            let filePath = path.join(currentDirPath, name);
            const stat = fs.statSync(filePath);

            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walkSync(filePath, callback);
            }
        }
    } catch (e) {
        throw e;
    }
}



module.exports = (folder) => {
    folder = folder.split(path.sep).join('/');
    let modules = {};

    walkSync(folder, (fp) => {
        const fullFilePath = fp;
        let parsed = path.parse(fp);
        if (parsed.base != 'index.js') return false;

        fp = fp.split(path.sep).join('/');
        fp = fp.substr(folder.length + 1);

        let fpArray = fp.split('/');
        fpArray.pop();

        if (!fpArray.length) return;

        modules[fpArray.join('/')] = require(fullFilePath);
    });

    return modules;
};