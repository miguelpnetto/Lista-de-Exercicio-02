class Endereco {
    #rua
    #numero
    #complemento
    #bairro
    #cidade
    #estado
    #cep

    constructor(rua, numero, complemento, bairro, cidade, estado, cep) {
        this.rua = rua
        this.numero = numero
        this.complemento = complemento
        this.bairro = bairro
        this.cidade = cidade
        this.estado = estado
        this.cep = cep
    }

    get rua() {
        return this.#rua
    }
    set rua(rua) {
        if (rua.length >= 5 && rua.length <= 100) {
            this.#rua = rua
        } else {
            throw new Error('A rua deve conter pelo menos 5 caracteres e no máximo 100 caracteres')
        }
    }

    get numero() {
        return this.#numero
    }
    set numero(numero) {
        if (numero > 0) {
            this.#numero = numero
        } else {
            throw new Error('O número deve ser um valor positivo')
        }
    }

    get complemento() {
        return this.#complemento
    }
    set complemento(complemento) {
        if (complemento.length <= 50) {
            this.#complemento = complemento
        } else {
            throw new Error('O complemento deve conter no máximo 50 caracteres')
        }
    }

    get bairro() {
        return this.#bairro
    }
    set bairro(bairro) {
        if (bairro.length >= 3 && bairro.length <= 50) {
            this.#bairro = bairro
        } else {
            throw new Error('O bairro deve conter pelo menos 3 caracteres e no máximo 50 caracteres')
        }
    }

    get cidade() {
        return this.#cidade
    }
    set cidade(cidade) {
        if (cidade.length >= 3 && cidade.length <= 50) {
            this.#cidade = cidade
        } else {
            throw new Error('A cidade deve conter pelo menos 3 caracteres e no máximo 50 caracteres')
        }
    }

    get estado() {
        return this.#estado
    }
    set estado(estado) {
        const estadosValidos = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
        if (estadosValidos.includes(estado)) {
            this.#estado = estado
        } else {
            throw new Error('Estado inválido. Use a sigla do estado (ex: PE, PB, SP, etc.)')
        }
    }

    get cep() {
        return this.#cep
    }
    set cep(cep) {
        const cepRegex = /^\d{5}-\d{3}$/  // Formato: 12345-678
        if (cepRegex.test(cep)) {
            this.#cep = cep
        } else {
            throw new Error('CEP inválido. O formato deve ser 12345-678')
        }
    }

    toString = () => `${this.rua}, ${this.numero}${this.complemento ? ' - ' + this.complemento : ''}, ${this.bairro}, ${this.cidade} - ${this.estado}, CEP: ${this.cep}`
}

try {
    rua1 = new Endereco('Rua 1', 25, 'Casa', 'Centro', 'Recife', 'PE', '55144-000')
    console.log(rua1.toString())
} catch (error) {
    console.error(error.message)
}