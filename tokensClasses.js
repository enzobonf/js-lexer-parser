const tokensClasses = [
    {
        class: 'TYPE',
        rgx: /^([f][l][o][a][t]$)|([i][n][t]$)|([c][h][a][r]$)|([v][o][i][d]$)/,
    },
    {
        class: 'IF',
        rgx: /^[i][f]$/,
    },
    {
        class: 'ELSE',
        rgx: /^[e][l][s][e]$/,
    },
    {
        class: 'RETURN',
        rgx: /^[r][e][t][u][r][n]$/,
    },
    {
        class: 'IDENTIFIER',
        rgx: /^[_a-zA-Z][_a-zA-Z0-9]*$/
    }
]

module.exports = { tokensClasses };