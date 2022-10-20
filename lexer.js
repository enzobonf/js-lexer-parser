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
                    newString += ` ${char}`;
                }
                else{
                    newString += char;
                }

            });

            return newString.split(' ').map((token) => ({
                token,
                line: index + 1
            }));
            
        }).flatMap((x) => x).filter((x)=>x.token.length);

        return tokens;
    }
}

const singletonInstance = (str) => new Lexer(str);
Object.freeze(singletonInstance);

module.exports = singletonInstance;