class HashTable {
    
    constructor(){
        this.table = new Array(127);
        this.size = 0;
    }

    _hash(key){
        let hash = 0;
        for(let i = 0; i < key.length; i++){ // soma o valor ASCII de todos os caracteres da key
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length; // limita o hash index de 0 até 127
    }

    inserir(key, value){
        const index = this._hash(key); // gera o hash
        if(this.table[index]){ // caso já exista uma key igual
            for(let i = 0; i < this.table[index].length; i++){ // percorre o encadeamento da chave
                if(this.table[index][i][0] === key){
                    this.table[index][i][1] = value; // se for encontrado atualiza o valor
                    return;
                }
            }
            
            this.table[index].push([key, value]);
        }
        else{
            this.table[index] = [[key, value]];
        }
        this.size++;
    }

    pesquisar(key){
        let index = this._hash(key);
        if(this.table[index]){
            for(let i = 0; i < this.table[index].length; i++){ // percorre o encadeamento da chave
                if(this.table[index][i][0] === key){
                    return this.table[index][i];
                }
            }
        }
        return undefined;
    }

    remover(key){
        const index = this._hash(key);
        if(this.table[index]){
            for(let i = 0; i < this.table[index].length; i++){ // percorre o encadeamento da chave
                if(this.table[index][i][0] === key){
                    this.table[index].splice(i, 1); // remove o valor do encadeamento
                    this.size--;
                    return true;
                }
            }
        }

        return false;
    }

    mostrar(){
        const keys = this.table.map((key, index)=>{
            return key.map((x) => ({
                    Hash: index,
                    Simbolo: x[0],
                    Tipo: x[1].class,
            }));
        });
        
        console.table(keys.flatMap((x) => x));
    }

    log(){
        console.log(this.table.flatMap((x) => x[0]));
    }

}

module.exports = {
    HashTable
};