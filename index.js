const Lexer = require("./lexer");


function main(){
    lexer(`
    def main():
        matriz = input_matrix();
        det = calc_determinante(matriz);
        inversa = np.linalg.inv(matriz) if det != 0 else 'impossível calcular';

        print('\nDeterminante:', det);
        #print('\nInversa:\n', inversa);
        
        print('\n');
        main();
    `)
}

function lexer(str){

    /* let tokens = str
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

    console.log(tokens); */
    
    const code = `
        int main(){
            int a, b;

            b = 2;
            a = b + 5;

            return 0;
        }
    `

    const lex = Lexer(code);
    const tokens = lex.tokenizer();

    console.log(tokens);
}


main();