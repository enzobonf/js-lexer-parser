const tokensClasses = [
    {
        class: 'TYPE',
        rgx: /^(float$)|(int$)|(char$)|(void$)/,
        reserved: true,
    },
    {
        class: 'IF',
        rgx: /^(if)$/,
        reserved: true,
    },
    /* {
        class: 'ELSE',
        rgx: /^(else)$/,
        reserved: true,
    }, */
    {
        class: 'RETURN',
        rgx: /^(return)$/,
        reserved: true,
    },
    {
        class: 'EQUAL_SIGN',
        rgx: /^(=)$/,
        reserved: true,
    },
    {
        class: 'EXCLAMATION',
        rgx: /^(!)$/,
        reserved: true,
    },
    {
        class: 'SEMI',
        rgx: /^(;)$/,
        reserved: true,
    },
    {
        class: 'CONMA',
        rgx: /^(,)$/,
        reserved: true,
    },
    {
        class: 'IDENTIFIER',
        rgx: /^[_a-zA-Z][_a-zA-Z0-9]*$/,
        reserved: false,
    },
    {
        class: 'OPEN_PARENTHESIS',
        rgx: /^([(])$/,
        reserved: true,
    },
    {
        class: 'CLOSE_PARENTHESIS',
        rgx: /^([)])$/,
        reserved: true,
    },
    {
        class: 'OPEN_BRACKET',
        rgx: /^([{])$/,
        reserved: true,
    },
    {
        class: 'CLOSE_BRACKET',
        rgx: /^([}])$/,
        reserved: true,
    },
    {
        class: 'DECIMAL',
        rgx: /^[0-9]+[.][0-9]+$/,
        reserved: false,
    },
    {
        class: 'INTEGER',
        rgx: /^[0-9]+$/,
        reserved: false
    }
]

module.exports = { tokensClasses };