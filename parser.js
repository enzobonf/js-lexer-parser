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
        this.S();
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
    
    S(){
        if(this.firstContainsToken("S")){
            this.tree.push("<S> ::= <TYPE> <IDENTIFIER> <S0> <S>");
            this.type();
            this.identifier();

            this.S0();
            this.S();
        }
        else{
            this.tree.push("<S> ::= λ");
        }
    }

    S0(){
        if(this.currentToken.class === tokensNames.COMMA){
            this.tree.push("<S0> ::= ; <S0_>");
            this.tokens.shift();
            this.S0_();
        }
        else if(this.firstContainsToken("FUNCTION_")){
            this.tree.push("<S0> ::= ; <FUNCTION_>");
            this.function_();
        }
        else{
            this.addError(this.currentToken, `Esperava uma declaração do tipo [",", "("]`);
        }
    }

    S0_(){
        if(this.firstContainsToken("S")){
            this.tree.push("<S0_> ::= <S>");
            this.S();
        }
        else{
            tree.push("<S0_> ::= λ");
        }
    }

    function_(){
        if(this.currentToken.class === tokensNames.OP){
            this.tree.push("<FUNCTION_> ::= ( <PARAM> ) <COMPOUND_STATEMENT>");
            this.tokens.shift();
        }
        else {
            this.addError(this.currentToken, 'Esperava uma declaração do tipo ["("]');
        }

        this.param();

        if(this.currentToken.class === tokensNames.CP){
            this.tokens.shift();
        }
        else {
            this.addError(this.currentToken, 'Esperava uma declaração do tipo [")"]');
        }

        this.compound_statement();
    }

    param(){
        if(this.firstContainsToken("TYPE")){
            this.tree.push("<PARAM> ::= <TYPE> <IDENTIFIER> <PARAM_LIST>");
            
            this.type();
            this.identifier();
            this.param_list();
        }
        else{
            this.tree.push("<PARAM> ::= λ");
        }
    }

    param_list(){
        if(this.currentToken.class === tokensNames.COMMA){
            this.tokens.shift();

            this.tree.push("<PARAM_LIST> ::= , <PARAM>");
            if(this.firstContainsToken("TYPE")){
                this.param();
            }
            else{
                this.addError(this.currentToken, `Esperava uma declaração do tipo [${firsts.TYPE.join(",")}]`);
            }
        }
        else if(this.currentToken.class === tokensNames.OBR){
            this.tree.push("<PARAM_LIST> ::= [ <F2> ]");
            this.tokens.shift();
            this.F2();

            if(this.currentToken.class === tokensNames.CBR){
                this.tokens.shift();
                this.param_list();
            }
            else{
                this.addError(this.currentToken, 'Esperava uma declaração do tipo ["]"]');
            }
        }
        else {
            this.tree.push("<PARAM_LIST> ::= λ");
        }
    }

    // para declaração de vetor nos parametros da função
    F2(){
        if(this.currentToken.class === tokensNames.NUMBER){
            this.tree.push("<F2> ::= number");
            this.tokens.shift();
        }
        else{
            this.tree.push("<F2> ::= λ")
        }
    }

    compound_statement(){
        this.tree.push("<COMPOUND_STATEMENT> ::= { <STATEMENT> }");
        if(this.currentToken.class === tokensNames.OB){
            this.tokens.shift();
        }
        else{
            this.addError(this.currentToken, 'Esperava uma declaração do tipo ["{"]');
        }

        this.statement();
        
        if(this.currentToken.class === tokensNames.CB){
            this.tokens.shift();
        }
        else{
            this.addError(this.currentToken, 'Esperava uma declaração do tipo ["}"]');
        }
    }

    statement(){
        if(this.firstContainsToken("DECLARATION")){
            this.tree.push("<STATEMENT> ::= <DECL> <STATEMENT>")
            this.decl();
            this.statement();
        }
        else if(this.firstContainsToken("TYPE_STATEMENT")){
            this.tree.push("<STATEMENT> ::= <TYPE_STATEMENT> <STATEMENT>")
            this.type_statement();
            this.statement();
        }
        else{
            this.tree.push("<STATEMENT> ::= λ")
        }
    }

    type_statement(){
        if(this.firstContainsToken("SELECTION")){
            this.tree.push("<TYPE_STATEMENT> ::= <SELECTION>");
            this.selection();
        }
        else if(this.firstContainsToken("ITERATION")){
            this.tree.push("<TYPE_STATEMENT> ::= <ITERATION>");
            this.iteration();
        }
        else if(this.firstContainsToken("EXPRESSION")){
            this.tree.push("<TYPE_STATEMENT> ::= <EXPR>");
            this.expr();

            if (this.currentToken.tokenClass === tokensNames.SEMI) {
                advanceToken();
            } 
            else {
                this.addError(this.currentToken, `Esperava uma declaração do tipo [";"]`);
            }
        }
        else{
            this.tree.push("<TYPE_STATEMENT> ::= <RETURN>");
        }
    }

    selection(){
        if(this.currentToken.class === tokensNames.IF){
            this.tree.push("<SELECTION> ::= if ( <EXPR> ) <COMPOUND_STATEMENT> <ELSE>");
            this.tokens.shift();

            if(this.currentToken.class === tokensNames.OP){
                this.tokens.shift();
            }
            else{
                this.addError(this.currentToken, 'Esperava uma declaração do tipo ["("]');
            }

            this.expr();

            if(this.currentToken.class === tokensNames.CP){
                this.tokens.shift();
            }
            else{
                this.addError(this.currentToken, 'Esperava uma declaração do tipo [")"]');
            }

            this.compound_statement();
            this.else_();

        }
    }

    else_() {
        if(this.currentToken.class === tokensNames.ELSE){
            //this.tree.push("<ELSE> ::= else <COMPOUND_STATEMENT>");
            this.tokens.shift();

            if(this.currentToken.class === tokensNames.IF){
                this.tree.push("<ELSE> ::= else <SELECTION>");
                this.selection();
            }
            else{
                this.tree.push("<ELSE> ::= else <COMPOUND_STATEMENT>");
                this.compound_statement();
            }

            //this.tokens.shift();
            //this.compound_statement();
        }
        else{
            this.tree.push("<ELSE> ::= λ");
        }
    }

    iteration(){

    }

    expr(){
        if(this.firstContainsToken("ASSIGNMENT")){
            this.tree.push("<EXPR> ::= <ASSIGNMENT> <EXPR_>");
            this.assignment();
            this.expr_();
        }
    }

    expr_(){   
        if(this.currentToken.class === tokensNames.COMMA){
            this.tree.push("<EXPR_> ::= , <ASSIGNMENT> <EXPR_>");
            this.tokens.shift();

            this.assignment();
            this.expr_();
        }
        else{
            this.tree.push("<EXPR_> ::= λ");
        }
    }

    // decl -> type id varlist
    decl(){
        this.tree.push('<DECL> ::= <TYPE> <VAR_LIST>')
        const s = this.type();
        this.var_list(s);
    }

    var_list(s){

        //console.log("Entrei na varList() com o tipoDado: " + s);
        this.tree.push('<VAR_LIST> :: <IDENTIFIER> <VAR_LIST_ROW>')
        const id = this.identifier();

        if(id){
            id.type = s;

            if(this.tabelaSimbolos.pesquisar(id.token)){
                this.addError(id, "Identificador já declarado")
            }
            else{
                this.tabelaSimbolos.inserir(id.token, id);  
            }

            this.var_list_row(s);
        }
    }

    var_list_row(s){
        if(this.currentToken.class === tokensNames.SEMI){
            this.tree.push('<VAR_LIST_ROW> :: ;')
            this.tokens.shift();
        }
        else if(this.currentToken.class === tokensNames.COMMA){
            this.tree.push('<VAR_LIST_ROW> :: , <VAR_LIST>')
            this.tokens.shift();
            this.var_list(s);
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
            this.tree.push(`<IDENTIFIER> ::= ${this.currentToken.token}`);
            return this.tokens.shift();
        }
        else{
            this.addError(this.currentToken, `Esperava uma declaração do tipo [id]`);
        }
    }

    value(){
        if(this.firstContainsToken("VALUE")){
            this.tree.push(`<VALUE> ::= ${this.currentToken.token}`);
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
            this.addError(this.currentToken, `Esperava uma declaração do tipo [${firsts.VALUE.join(",")}]`);
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