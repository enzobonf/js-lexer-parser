const Lexer = require("./lexer");
const { tokensClasses } = require("./tokensClasses");

function main(){
    const code = `
        int main(){

            int a, b;
            b = 5;
            
            if(b == 5){
                a = 2;
            }
            else{
                a = 3;
            }

            return 0;

        }
    `

    const lex = Lexer(code);
    const tokens = lex.tokenizer();

    console.log(tokens);
    lex.showErrorMessages();
    
}

main();