const { tokensClasses } = require("./tokensClasses");

class Lexer {

    str = '';
    tokens = [];

    constructor(str){
        this.str = str;
    }

    tokenizer(){
        let tokens = this.str
        .split('\n')
        .map((item, index)=>{

            let newString = "";
            item.split("").forEach((char) => {
                if((/([(]|[)]|[{]|[}]|[;]|[,]|[+]|[-]|[*]|[/]|[>]|[<]|[=]|[|]|[&])/).test(char)){
                    newString += ` ${char} `;
                }
                /* else if(char === `"`){
                    newString += ` ${char} `;
                } */
                else{
                    newString += char;
                }
            });

            console.log(newString);

            return newString.split(' ').map((token) => ({
                token,
                line: index + 1
            }));
            
        }).flatMap((x) => x).filter((x)=>x.token.length);

        const tokensWithClass = tokens.map((token) => {
            const tokenClass = Lexer.getTokenClass(token);
            return {
                ...token,
                tokenClass
            }
        })

        this.tokens = tokensWithClass;
        this.showErrorMessages();
        return tokensWithClass;
    }

    
    showErrorMessages(){ 
        let errorMessages = [];
        for(let token of this.tokens){
            if(!token.tokenClass){
                errorMessages.push({
                    message: `Erro léxico na linha ${token.line}, token ${token.token} não identificado`
                });
            }
        }
        console.log(errorMessages);
    }

    static getTokenClass(tokenObj){
        const tokenClass = tokensClasses.find((x) => x.rgx.test(tokenObj.token));
        return tokenClass?.class ?? undefined;
    }
}

const singletonInstance = (str) => new Lexer(str);
Object.freeze(singletonInstance);

module.exports = singletonInstance;