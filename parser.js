const { HashTable } = require("./hash");
const { firsts, tokensNames } = require("./language_definitions");

const eofToken = {
    token: 'EOF',
    line: -1,
    class: "EOF"
}

class Parser {

    tokens = [];
    errors = [];
    currentTokenIndex = 0;
    //currentToken = null;
    
    tabelaSimbolos = new HashTable();
    tabelaReservadas = new HashTable();

    constructor(tokens, tabelaSimbolos, tabelaReservadas){
        this.tokens = tokens;
        //this.currentToken = this.tokens[this.currentTokenIndex];
       /*  this.tabelaSimbolos = tabelaSimbolos;
        this.tabelaReservadas = tabelaReservadas; */
    }

    analyze(){
        this.decl();
    }
    
    addError(tokenReceived, message){
        this.errors.push({tokenReceived, message});
    }

    showErrors(){
        console.table(this.errors.map((x)=>({
            ...x.tokenReceived,
            erro: x.message
        })));
    }

    firstContainsToken(leftIndicator){
        if(!this.currentToken) {
            this.currentToken = eofToken;
            return false;
        }
        
        return firsts[leftIndicator].some((className)=>className === this.currentToken.class);
    }

    get currentToken(){
        return this.tokens.at(0);
    }
    
    // decl -> type id decl_
    decl(){
        const s = this.type();
        this.varList(s);

        console.log(this.tokens);
        /* if(this.currentToken.class === tokensNames.SEMI){
            this.tokens.shift();
        } */
    }

    varList(s){

        console.log("Entrei na varLista() com o tipoDado: " + s);
        const id = this.identifier();

        if(id){
            id.type = s;

            if(this.tabelaSimbolos.pesquisar(id.token)){
                this.addError(id, "Identificador já declarado")
            }
            else{
                this.tabelaSimbolos.inserir(id.token, id);
            }

            this.varListRow(s);
        }
    }

    varListRow(s){
        if(this.currentToken.class === tokensNames.SEMI){
            this.tokens.shift();
        }
        else if(this.currentToken.class === tokensNames.COMMA){
            this.tokens.shift();
            this.varList(s);
        }
        else{
            this.addError(this.currentToken, `Esperava uma declaração do tipo ["," , ";"]`);
        }
    }

    // decl_ -> ; | , id decl_
    /* decl_(){
        if(this.currentToken.class === tokensNames.SEMI){
            //this.advanceToken();
            this.tokens.shift();
        }
        else if(this.currentToken.class === tokensNames.COMMA){
            //this.advanceToken();
            this.tokens.shift();

            const id = this.identifier();


            this.decl_();
        }
        else{
            this.addError(this.currentToken, `Esperava uma declaração do tipo ["," , ";"]`);
        }
    } */

    type(){
        if (firsts.TYPE.some((className) => className === this.currentToken.class)) {
            return this.tokens.shift().class;
        } else {
            this.addError(this.currentToken, `Esperava uma declaração do tipo [${firsts.TYPE.join(",")}]`);
        }
    }

    identifier(){
        if(this.currentToken.class === tokensNames.ID){
            return this.tokens.shift();
        }
        else{
            this.addError(this.currentToken, `Esperava uma declaração do tipo [id]`);
        }
    }

}

module.exports = { Parser };