class Produto {
    #nome
    #preco
    #quantidade

    constructor(nome, preco, quantidade) {
        this.nome = nome
        this.preco = preco
        this.quantidade = quantidade
    }

    get nome() {
        return this.#nome
    }
    set nome(nome) {
        if (nome.length >= 3) {
            this.#nome = nome
        } else {
            throw new Error('O nome deve conter pelo menos 3 caracteres')
        }
    }

    get preco() {
        return this.#preco
    }
    set preco(preco) {
        if (preco > 0) {
            this.#preco = preco
        } else {
            throw new Error('O preço deve ser maior que zero')
        }
    }

    get quantidade() {
        return this.#quantidade
    }
    set quantidade(quantidade) {
        if (quantidade > 0) {
            this.#quantidade = quantidade
        } else {
            throw new Error('A quantidade deve ser maior que zero')
        }
    }

    calcularTotal = () => this.preco * this.quantidade

    toString = () => `
    Produto: ${this.nome}
    Preço: R$${this.preco.toFixed(2)}
    Quantidade: ${this.quantidade}
    Total: R$${this.calcularTotal().toFixed(2)}`

}

produto1 = new Produto('Camiseta', 50, 2)
console.log(produto1.toString())

//testanto o error
try {
    produto2 = new Produto('Calção', -50, 1) // Erro: O preço deve ser maior que zero
    console.log(produto2.toString())
} catch (error) {
    console.log(error.message)
}
