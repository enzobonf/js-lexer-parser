const { HashTable } = require("./hash");
const { firsts, tokensNames } = require("./language_definitions");

const eofToken = {
    token: 'EOF',
    line: -1,
    class: "EOF"
}

class Parser {

    tokens = [];
    tree = [];
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
        //this.decl();
        this.decl();
        console.log(this.tree);
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
            //this.currentToken = eofToken;
            return false;
        }
        
        return firsts[leftIndicator].some((className)=>className === this.currentToken.class);
    }

    get currentToken(){
        return this.tokens.at(0) ?? eofToken;
    }
    
    // decl -> type id varlist
    decl(){

        this.tree.push('<DECL> ::= <TYPE> <VARLIST>')

        const s = this.type();
        this.varList(s);
        
        /* if(this.currentToken.class === tokensNames.SEMI){
            this.tokens.shift();
        } */
    }

    varList(s){

        //console.log("Entrei na varLista() com o tipoDado: " + s);
        this.tree.push('<VARLIST> :: <IDENTIFIER> <VARLISTROW>')
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
            this.tree.push('<VARLISTROW> :: ;')
            this.tokens.shift();
        }
        else if(this.currentToken.class === tokensNames.COMMA){
            this.tree.push('<VARLISTROW> :: , <VARLIST>')
            this.tokens.shift();
            this.varList(s);
        }
        else{
            this.addError(this.currentToken, `Esperava uma declaração do tipo ["," , ";"]`);
        }
    }

    type(){
        if (firsts.TYPE.some((className) => className === this.currentToken.class)) {
            this.tree.push(`<TYPE> ::= ${this.currentToken.class}`);
            return this.tokens.shift().class;
        } else {
            this.addError(this.currentToken, `Esperava uma declaração do tipo [${firsts.TYPE.join(",")}]`);
        }
    }

    identifier(){
        if(this.currentToken.class === tokensNames.ID){
            this.tree.push(`<IDENTIFIER> ::= ${this.currentToken.class}`);
            return this.tokens.shift();
        }
        else{
            this.addError(this.currentToken, `Esperava uma declaração do tipo [id]`);
        }
    }

    value(){
        if(firsts.VALUE.some((className)=> className === this.currentToken.class)){
            this.tree.push(`<VALUE> ::= ${this.currentToken.class}`);
            return this.tokens.shift();
        }
        else {
            this.addError(this.currentToken, `Esperava uma declaração do tipo [${firsts.VALUE.join(",")}]`);
        }
    }

    primary(){
        if(this.firstContainsToken('VALUE')){
            this.tree.push("<PRIMARY> ::= <VALUE>");
            return this.value();
        }
        else if(this.firstContainsToken('IDENTIFIER')){
            this.tree.push("<PRIMARY> ::= <IDENTIFIFER>");
            return this.identifier();
        }
        else{
            this.addError(this.currentToken, `Esperava uma declaração do tipo [${firsts.VALUE.join(",")}id]`);
        }
    }

    assignment(){
        this.tree.push("<ASSIGNMENT> ::= <PRIMARY> <ASSIGNMENT_>");
        this.primary();
        this.assignment_();
    }
    
    assignment_(){
        if(this.firstContainsToken("OPERATOR")){
            this.tree.push("<ASSIGNMENT_> ::= <OPERATOR> <ASSIGNMENT>");
            this.operator();
            this.assignment();
        }
        else{
            this.tree.push("<ASSIGNMENT_> ::= λ")
        }
    }

    operator(){
        if(firsts.OPERATOR.some((className) => className === this.currentToken.class)) {
            this.tree.push(`<OPERATOR> ::= ${this.currentToken.class}`);
            return this.tokens.shift().class;
        } else {
            this.addError(this.currentToken, `Esperava uma declaração do tipo [${firsts.OPERATOR.join(",")}]`);
        }
    }
}

module.exports = { Parser };