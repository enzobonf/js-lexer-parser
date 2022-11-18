const { HashTable } = require("./hash");
const Lexer = require("./lexer");
const { tokensClasses } = require("./tokensClasses");
const readline = require('readline');
const { readFile } = require("./file");

function main(){

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Digite o caminho do programa a ser lido, com extensão: \n', (filename) => {

        const code = readFile(filename); // retorna o texto obtido do arquivo
        const lex = Lexer(code); // Inicializa o lexer, passando o código lido para a classe
        
        lex.tokenizer(); // executa o método que analisa lexicamente o código
        lex.mostrarTabelas(); // mostra as tabelas de reservadas e de símbolos
        lex.mostrarErros(); // mostra os erros, se  houverem

    });
    
}

main();