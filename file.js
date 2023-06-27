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

function writeSyntaxTree(path, tree = []){
    if(fs.existsSync())
        fs.unlinkSync(path);
    
    fs.writeFileSync(path, tree.join('\n'));
    console.log('Árvore sintática escrita no arquivo');
}

module.exports = { readFile, writeSyntaxTree };