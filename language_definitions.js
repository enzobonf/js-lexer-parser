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
    SUBTRACT: "SUBTRACT_SIGN",
    MULTIPLY: "MULTIPLY_SIGN",
    DIV: "DIV_SIGN",
    EQUAL: "EQUAL_SIGN",
    AND: "AND_SIGN",
    MINOR: "MINOR_SIGN",
    GREATER: "GREATER_SIGN",
    EXCLAMATION: "EXCLAMATION",
    SEMI: "SEMI",
    COMMA: "COMMA",
    ID: "ID",
    OP: "OPEN_PARENTHESIS",
    CP: "CLOSE_PARENTHESIS",
    OB: "OPEN_BRACKET",
    CB: "CLOSE_BRACKET",
    OBR: "OPEN_SQBRACKET",
    CBR: "CLOSE_SQBRACKET",
    DECIMAL: "DECIMAL",
    NUMBER: "NUMBER",
    STRING: "STRING",
    CHARACTER: "CHARACTER",
    EMPTY: "λ"
}

const tokensClasses = [
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
        class: tokensNames.SUBTRACT,
        rgx: /^(\-)$/,
        reserved: true,
    },
    {
        class: tokensNames.MULTIPLY,
        rgx: /^[*]$/,
        reserved: true,
    },
    {
        class: tokensNames.DIV,
        rgx: /^(\/)$/,
        reserved: true,
    },
    {
        class: tokensNames.AND,
        rgx: /^(\&)$/,
        reserved: true,
    },
    {
        class: tokensNames.MINOR,
        rgx: /^(\<)$/,
        reserved: true,
    },
    {
        class: tokensNames.GREATER,
        rgx: /^(\>)$/,
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
        class: tokensNames.OBR,
        rgx: /^([[])$/,
        reserved: true,
    },
    {
        class: tokensNames.CBR,
        rgx: /^([\]])$/,
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
        reserved: false,
    },
    {
        class: tokensNames.STRING,
        rgx: /^["].*["]$/,
        reserved: false,
      },
    {
        class: tokensNames.CHARACTER,
        rgx: /^['].[']$/,
        reserved: false,
      },
]

const firsts = {
    S: [
      tokensNames.INT,
      tokensNames.FLOAT,
      tokensNames.CHAR,
      tokensNames.VOID,
      tokensNames.EMPTY,
    ],
    S0: [tokensNames.SEMI],
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
    VALUE: [
        tokensNames.NUMBER,
        tokensNames.DECIMAL,
        tokensNames.STRING
    ],
    OPERATOR: [
        tokensNames.ADD,
        tokensNames.SUBTRACT,
        tokensNames.MULTIPLY,
        tokensNames.DIV,
        tokensNames.EQUAL,
        tokensNames.AND,
        tokensNames.MINOR,
        tokensNames.GREATER,
    ],
    FUNCTION: [
        tokensNames.INT,
        tokensNames.FLOAT,
        tokensNames.CHAR,
        tokensNames.VOID,
      ],
    FUNCTION_: [tokensNames.OP],
    EXPRESSION: [
        tokensNames.ID,
        tokensNames.NUMBER,
        tokensNames.DECIMAL,
        tokensNames.STRING,
        tokensNames.CHARACTER,
      ],
    EXPRESSION_: [tokensNames.COMMA, tokensNames.EMPTY],
    STATEMENT: [tokensNames.OBR],
    STATEMENT_: [
        tokensNames.IF,
        /* tokensNames.WHILE,
        tokensNames.FOR, */
        tokensNames.ID,
        tokensNames.NUMBER,
        tokensNames.DECIMAL,
        tokensNames.STRING,
        tokensNames.CHARACTER,
        tokensNames.INT,
        tokensNames.FLOAT,
        tokensNames.CHAR,
        tokensNames.VOID,
        tokensNames.EMPTY,
        tokensNames.RETURN,
    ],
}

module.exports = { tokensNames, tokensClasses, firsts };