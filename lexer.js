const { HashTable } = require("./hash");
const { tokensClasses } = require("./tokensClasses");

class Lexer {

    str = '';
    tokens = [];
    tabelaSimbolos = new HashTable();

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
                if((/([(]|[)]|[{]|[}]|[;]|[,]|[+]|[-]|[*]|[/]|[>]|[<]|[=]|[|]|[&])/).test(char)){
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
            
        }).flatMap((x) => x).filter((x) => x.token);

        console.log(tokens); 

        const tokensWithClass = tokens.map((token) => {
            const tokenClass = Lexer.getTokenClass(token);
            console.log(tokenClass);
            
            if(tokenClass && tokenClass === 'IDENTIFIER'){
                this.tabelaSimbolos.inserir(token.token, { type: tokenClass });
            }

            return {
                ...token,
                class: tokenClass
            }
        })

        this.tokens = tokensWithClass;
        return tokensWithClass;
    }

    
    showErrorMessages(){ 
        let errorMessages = [];
        for(let token of this.tokens){
            if(!token.class){
                errorMessages.push({
                    message: `Erro léxico na linha ${token.line}, token "${token.token}" não identificado`
                });
            }
        }
        console.log(errorMessages);
    }

    mostrarSimbolos(){
        this.tabelaSimbolos.mostrar();
    }

    static getTokenClass(tokenObj){
        const tokenClass = tokensClasses.find((x) => x.rgx.test(tokenObj.token));
        return tokenClass?.class ?? undefined;
    }
}

const singletonInstance = (str) => new Lexer(str);
Object.freeze(singletonInstance);

module.exports = singletonInstance;