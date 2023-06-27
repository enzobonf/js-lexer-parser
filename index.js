const Lexer = require("./lexer");
const readline = require('readline');
const { readFile, writeSyntaxTree } = require("./file");
const { Parser } = require("./parser");

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

        if(lex.erros.length === 0){
            const parser = new Parser(lex.tokens, lex.tabelaSimbolos);
            parser.analyze();
            parser.showErrors();
            parser.showTable();

            if(!parser.errors.length){
                const tree = parser.tree;
                const treeFilename = filename.split('.')[0];
                writeSyntaxTree(`./arvore_${treeFilename}.txt`, tree);
            }
        }

        process.exit(0);
    });

}

main();