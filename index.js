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
        
        const parser = new Parser(lex.tokens, lex.tabelaSimbolos);
        parser.analyze();

        lex.mostrarTabelas(); // mostra as tabelas de reservadas e de símbolos
        parser.showTable();
        lex.mostrarErros(); // mostra os erros, se  houverem

        if(!parser.errors.length){
            const tree = parser.tree;
            const treeFilename = `./arvore_${filename.split('.')[0]}.txt`;
            writeSyntaxTree(treeFilename, tree);
            console.log('Não foram encontrados erros sintáticos');
            console.log(`Árvore sintática escrita no arquivo ${treeFilename}`);
        }
        else{
            parser.showErrors();
        }

        process.exit(0);
    });

}

main();