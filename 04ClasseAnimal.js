class Animal {
    #nome
    #tipo

    constructor(nome, tipo) {
        this.nome = nome
        this.tipo = tipo
    }

    get nome() {
        return this.#nome
    }
    set nome(nome) {
        if (nome.length > 3) {
            this.#nome = nome
        } else {
            throw new Error('O nome deve conter mais de 3 caracteres')
        }
    }

    get tipo() {
        return this.#tipo
    }
    set tipo(tipo) {
        if (tipo === 'mamífero' || tipo === 'réptil' || tipo === 'ave' || tipo === 'peixe' || tipo === 'anfíbio') {
            this.#tipo = tipo
        } else {
            throw new Error('O tipo deve ser mamífero, réptil, ave, peixe ou anfíbio')
        }
    }

    emitirSom() {
        switch (this.#tipo) {
            case 'mamífero':
                return 'O animal emite som de mamífero'
            case 'réptil':
                return 'O animal emite som de réptil'
            case 'ave':
                return 'O animal emite som de ave'
            case 'peixe':
                return 'O animal emite som de peixe'
            case 'anfíbio':
                return 'O animal emite som de anfíbio'
        }
    }
}

try {
    bicho1 = new Animal('Nego', 'Mamífero'.toLowerCase())
    console.log(bicho1.emitirSom())
} catch (error) {
    console.error(error.message)
}