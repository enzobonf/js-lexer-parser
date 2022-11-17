const { HashTable } = require("./hash");
const { tokensClasses } = require("./tokensClasses");

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
        .split('\n')
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

            //console.log(newString);

            return newString.split(' ').map((token) => ({
                token,
                line: index + 1
            }));
            
        }).flatMap((x) => x).filter((x) => x.token);

        tokens.forEach((token)=>{
            const tokenClass = Lexer.getTokenClass(token);

            if(tokenClass){
                if(tokenClass.class === 'IDENTIFIER' && !this.tabelaSimbolos.pesquisar(token.token)){
                    this.tabelaSimbolos.inserir(token.token, {
                        ...token,
                        class: tokenClass.class,
                    });
                }
                else if(tokenClass.reserved && !this.tabelaReservadas.pesquisar(token.token)){
                    this.tabelaReservadas.inserir(token.token, {
                        ...token,
                        class: tokenClass.class,
                    });
                }
            }
            else{
                this.erros.push({
                    message: `Erro léxico na linha ${token.line}, token "${token.token}" não identificado`
                });
            }

        })
    }

    
    mostrarErros(){ 
        for(let erro of this.erros){
            console.log(erro.message);
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