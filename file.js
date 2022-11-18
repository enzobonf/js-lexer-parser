const fs = require('fs');

function readFile(filename){
    try{
        const file = fs.readFileSync(filename);
        return file.toString();
    }
    catch(err){
        throw new Error('Não foi possível ler o arquivo');
    }
}

module.exports = { readFile };