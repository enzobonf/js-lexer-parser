const tokensClasses = [
    {
        class: 'TYPE',
        rgx: /^(float$)|(int$)|(char$)|(void$)/,
    },
    {
        class: 'IF',
        rgx: /^(if)$/,
    },
    {
        class: 'ELSE',
        rgx: /^(else)$/,
    },
    {
        class: 'RETURN',
        rgx: /^(return)$/,
    },
    {
        class: 'EQUAL_SIGN',
        rgx: /^(=)$/,
    },
    {
        class: 'SEMI',
        rgx: /^(;)$/,
    },
    {
        class: 'CONMA',
        rgx: /^(,)$/,
    },
    {
        class: 'IDENTIFIER',
        rgx: /^[_a-zA-Z][_a-zA-Z0-9]*$/
    },
    {
        class: 'OPEN_PARENTHESIS',
        rgx: /^([(])$/,
    },
    {
        class: 'CLOSE_PARENTHESIS',
        rgx: /^([)])$/,
    },
    {
        class: 'OPEN_BRACKET',
        rgx: /^([{])$/,
    },
    {
        class: 'CLOSE_BRACKET',
        rgx: /^([}])$/,
    },
    {
        class: 'DECIMAL',
        rgx: /^[0-9]+[.][0-9]+$/
    },
    {
        class: 'INTEGER',
        rgx: /^[0-9]+$/
    }
]

module.exports = { tokensClasses };