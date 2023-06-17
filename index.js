const Lexer = require("./lexer");
const readline = require('readline');
const { readFile } = require("./file");
const { Parser } = require("./parser");

function main(){

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    /* rl.question('Digite o caminho do programa a ser lido, com extensão: \n', (filename) => {

        const code = readFile(filename); // retorna o texto obtido do arquivo
        const lex = Lexer(code); // Inicializa o lexer, passando o código lido para a classe
        
        lex.tokenizer(); // executa o método que analisa lexicamente o código
        lex.mostrarTabelas(); // mostra as tabelas de reservadas e de símbolos
        lex.mostrarErros(); // mostra os erros, se  houverem

        process.exit(0);
    }); */

    const code = readFile('fonte3.txt'); // retorna o texto obtido do arquivo
    const lex = Lexer(code); // Inicializa o lexer, passando o código lido para a classe
    
    lex.tokenizer(); // executa o método que analisa lexicamente o código
    //lex.mostrarTabelas(); // mostra as tabelas de reservadas e de símbolos
    lex.mostrarErros(); // mostra os erros, se  houverem

    if(lex.erros.length === 0){
        const parser = new Parser(lex.tokens, lex.tabelaSimbolos, lex.tabelaReservadas);
        parser.analyze();
        parser.showErrors();
       // parser.tabelaSimbolos.mostrarSimbolos();
    }

    
}

main();