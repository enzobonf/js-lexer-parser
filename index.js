const Lexer = require("./lexer");


function main(){
    const code = `
        int main(){

            int a, b;
            b = 5;
            a = b + 2;

            return 0;

        }
    `

    const lex = Lexer(code);
    const tokens = lex.tokenizer();
    
    console.log(tokens);
}

main();