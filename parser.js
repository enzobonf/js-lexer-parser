const { HashTable } = require("./hash");
const { firsts, tokensNames } = require("./language_definitions");

class Parser {

    tokens = [];
    errors = [];
    currentTokenIndex = 0;
    currentToken = null;
    
    tabelaSimbolos = new HashTable();
    tabelaReservadas = new HashTable();

    constructor(tokens, tabelaSimbolos, tabelaReservadas){
        this.tokens = tokens;
        this.currentToken = this.tokens[this.currentTokenIndex];
        this.tabelaSimbolos = tabelaSimbolos;
        this.tabelaReservadas = tabelaReservadas;
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
        if(token === null || token == undefined){
            this.currentToken = {
                token: 'EOF',
                line: -1,
                class: "EOF"
            }
            return false;
        }
        
        return firsts[leftIndicator].some((className)=>className === this.currentToken.class);
    }

    advanceToken() {
        if (this.currentTokenIndex < this.tokens.length) {
          this.currentTokenIndex = this.currentTokenIndex + 1;
          this.currentToken = this.tokens[this.currentTokenIndex];
        }
    }

    
    // decl -> type id decl_
    decl(){
        this.type();
        console.log(this.identifier());
        this.decl_();
    }

    // decl_ -> ; | , id decl_
    decl_(){
        if(this.currentToken.class === tokensNames.SEMI){
            this.advanceToken();
        }
        else if(this.currentToken.class === tokensNames.COMMA){
            this.advanceToken();

            console.log(this.identifier());

            this.decl_();
        }
        else{
            this.addError(this.currentToken, `Esperava uma declaração do tipo ["," , ";"]`);
        }
    }

    type(){
        if (firsts.TYPE.some((className) => className === this.currentToken.class)) {
            this.advanceToken();
        } else {
            this.addError(this.currentToken, `Esperava uma declaração do tipo [${firsts.TYPE.join(",")}]`);
        }
    }

    identifier(){
        if(this.currentToken.class === tokensNames.ID){
            const id = this.currentToken;
            this.advanceToken();
            return id;
        }
        else{
            this.addError(this.currentToken, `Esperava uma declaração do tipo [id]`);
        }
    }

}

module.exports = { Parser };