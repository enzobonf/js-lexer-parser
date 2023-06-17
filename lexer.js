const { HashTable } = require("./hash");
const { tokensClasses } = require("./language_definitions");

class Lexer {

    str = '';
    tokens = [];
    erros = [];
    tabelaSimbolos = new HashTable();
    tabelaReservadas = new HashTable();

    constructor(str){
        this.str = str;
    }

    tokenizer(){
        let tokens = this.str
        .split('\n') // separa a string por linhas, o split é equivalente ao strtok do C
        .map((item, index)=>{

            let newString = "";

            const items = item.split("");
            items.forEach((char) => {
                if((/([(]|[)]|[{]|[}]|[;]|[,]|[+]|[-]|[*]|[/]|[>]|[<]|[=]|[|]|[&]|[!])/).test(char)){
                    newString += ` ${char} `;
                }
                else{
                    newString += char;
                }
            });

            return newString.split(' ').map((token) => ({
                token,
                line: index + 1
            }));
            
        }).flatMap((x) => x).filter((x) => x.token && x.token !== '\r');

        tokens.forEach((token)=>{
            const tokenClass = Lexer.getTokenClass(token);

            if(tokenClass){
                const tokenObj = {
                    ...token,
                    class: tokenClass.class,
                }

                this.tokens.push(tokenObj);

                if(tokenClass.class === 'IDENTIFIER' && !this.tabelaSimbolos.pesquisar(token.token)){
                    this.tabelaSimbolos.inserir(token.token, tokenObj);
                }
                // se for palavra reservada e ainda não estiver na tabela, insere-o
                else if(tokenClass.reserved && !this.tabelaReservadas.pesquisar(token.token)){
                    this.tabelaReservadas.inserir(token.token, tokenObj);
                }
            }
            else{
                this.erros.push({
                    message: `Erro léxico na linha ${token.line}, token "${token.token}" não identificado`
                }); // se a classe do token não for encontrada, gera um erro
            }
            
        })
    }

    
    mostrarErros(){ 
        if(this.erros.length > 0){
            for(let erro of this.erros){
                console.log(erro);
            }
        }
        else{
            console.log('Não foram encontrados erros léxicos');
        }
    }

    mostrarTabelas(){
        console.log('Tabela de símbolos: ')
        this.tabelaSimbolos.mostrar();
        console.log('Tabela de palavras reservadas: ')
        this.tabelaReservadas.mostrar();
    }
    

    static getTokenClass(tokenObj){
        const tokenClass = tokensClasses.find((x) => x.rgx.test(tokenObj.token));
        return tokenClass ?? undefined; // se não encontrar a classe, retorna undefined
    }
}

const singletonInstance = (str) => new Lexer(str);
Object.freeze(singletonInstance);

module.exports = singletonInstance;