class Livro {
    #titulo
    #autor
    #editora
    #anoPublicacao
    #disponivel

    constructor(titulo, autor, editora, anoPublicacao) {
        this.titulo = titulo
        this.autor = autor
        this.editora = editora
        this.anoPublicacao = anoPublicacao
        this.disponivel = true
    }

    get titulo() {
        return this.#titulo
    }
    set titulo(titulo) {
        if (titulo.length >= 5 && titulo.length <= 20) {
            this.#titulo = titulo
        } else {
            throw new Error('O título deve conter pelo menos 5 caracteres e no máximo 20 caracteres')
        }
    }

    get autor() {
        return this.#autor
    }
    set autor(autor) {
        if (autor.length >= 2) {
            this.#autor = autor
        } else {
            throw new Error('O autor deve conter pelo menos 2 caracteres')
        }
    }

    get editora() {
        return this.#editora
    }
    set editora(editora) {
        if (editora.length >= 3 && editora.length <= 100) {
            this.#editora = editora
        } else {
            throw new Error('A editora deve conter pelo menos 3 caracteres e no máximo 100 caracteres')
        }
    }

    get anoPublicacao() {
        return this.#anoPublicacao
    }
    set anoPublicacao(anoPublicacao) {
        if (anoPublicacao >= 1500 && anoPublicacao <= new Date().getFullYear()) {
            this.#anoPublicacao = anoPublicacao
        } else {
            throw new Error('O ano de publicação deve ser entre 1500 e o ano atual')
        }
    }

    emprestar = () => {
        if (this.disponivel) {
            this.#disponivel = false
            console.log(`O livro "${this.#titulo}" foi emprestado.`)
        } else {
            console.log(`O livro "${this.#titulo}" não está disponível para empréstimo.`)
        }
    }

    devolver = () => {
        if (!this.disponivel) {
            this.#disponivel = true
            console.log(`O livro "${this.#titulo}" foi devolvido.`)
        } else {
            console.log(`O livro "${this.#titulo}" já está disponível na biblioteca.`)
        }
    }

    estaDisponivel = () => this.#disponivel

    idadeLivro = () => new Date().getFullYear() - this.#anoPublicacao

    toString = () => `
    Título: ${this.#titulo}
    Autor: ${this.#autor}
    Editora: ${this.#editora}
    Ano de Publicação: ${this.#anoPublicacao}
    Idade do Livro: ${this.idadeLivro()} anos
    Status: ${this.#disponivel ? 'Disponível' : 'Emprestado'}`
}

try {
    livro1 = new Livro('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', 1954)
    console.log(livro1.toString())
    livro1.emprestar()
    console.log(livro1.estaDisponivel())
    console.log(livro1.toString())
    livro1.devolver()
    console.log(livro1.estaDisponivel())
    console.log(livro1.toString())
} catch (error) {
    console.error(error.message)
}