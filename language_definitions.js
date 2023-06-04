const tokensNames = {
    TYPE: "TYPE",
    FLOAT: "FLOAT",
    INT: "INT",
    CHAR: "CHAR",
    VOID: "VOID",
    IF: "IF",
    ELSE: "ELSE",
    RETURN: "RETURN",
    ADD: "ADD_SIGN",
    EQUAL: "EQUAL_SIGN",
    EXCLAMATION: "EXCLAMATION",
    SEMI: "SEMI",
    COMMA: "COMMA",
    ID: "ID",
    OP: "OPEN_PARENTHESIS",
    CP: "CLOSE_PARENTHESIS",
    OB: "OPEN_BRACKET",
    CB: "CLOSE_BRACKET",
    DECIMAL: "DECIMAL",
    NUMBER: "NUMBER",
    EMPTY: "λ"
}

const tokensClasses = [
    /* {
        class: tokensNames.TYPE,
        rgx: /^(float)$|(int)$|(char)$|(void)$/,
        reserved: true,
    }, */
    {
        class: tokensNames.FLOAT,
        rgx: /^(float)$/,
        reserved: true,
    },
    {
        class: tokensNames.INT,
        rgx: /^(int)$/,
        reserved: true,
    },
    {
        class: tokensNames.CHAR,
        rgx: /^(char)$/,
        reserved: true,
    },
    {
        class: tokensNames.VOID,
        rgx: /^(void)$/,
        reserved: true,
    },
    {
        class: tokensNames.IF,
        rgx: /^(if)$/,
        reserved: true,
    },
    {
        class: tokensNames.ELSE,
        rgx: /^(else)$/,
        reserved: true,
    },
    {
        class: tokensNames.RETURN,
        rgx: /^(return)$/,
        reserved: true,
    },
    {
        class: tokensNames.ADD,
        rgx: /^(\+)$/,
        reserved: true,
    },
    {
        class: tokensNames.EQUAL,
        rgx: /^(=)$/,
        reserved: true,
    },
    {
        class: tokensNames.EXCLAMATION,
        rgx: /^(!)$/,
        reserved: true,
    },
    {
        class: tokensNames.SEMI,
        rgx: /^(;)$/,
        reserved: true,
    },
    {
        class: tokensNames.COMMA,
        rgx: /^(,)$/,
        reserved: true,
    },
    {
        class: tokensNames.ID,
        rgx: /^[_a-zA-Z][_a-zA-Z0-9]*$/,
        reserved: false,
    },
    {
        class: tokensNames.OP,
        rgx: /^([(])$/,
        reserved: true,
    },
    {
        class: tokensNames.CP,
        rgx: /^([)])$/,
        reserved: true,
    },
    {
        class: tokensNames.OB,
        rgx: /^([{])$/,
        reserved: true,
    },
    {
        class: tokensNames.CB,
        rgx: /^([}])$/,
        reserved: true,
    },
    {
        class: tokensNames.DECIMAL,
        rgx: /^[0-9]+[.][0-9]+$/,
        reserved: false,
    },
    {
        class: tokensNames.NUMBER,
        rgx: /^[0-9]+$/,
        reserved: false
    }
]

const firsts = {
    S: [
      tokensNames.INT,
      tokensNames.FLOAT,
      tokensNames.CHAR,
      tokensNames.VOID,
      tokensNames.EMPTY,
    ],
    DECLARATION: [
        tokensNames.INT,
        tokensNames.FLOAT,
        tokensNames.CHAR,
        tokensNames.VOID,
    ],
    DECLARATION_: [tokensNames.SEMICOLON, tokensNames.COMMA],
    IDENTIFIER: [tokensNames.ID],
    TYPE: [
        tokensNames.INT,
        tokensNames.FLOAT,
        tokensNames.CHAR,
        tokensNames.VOID,
    ],
}

module.exports = { tokensNames, tokensClasses, firsts };