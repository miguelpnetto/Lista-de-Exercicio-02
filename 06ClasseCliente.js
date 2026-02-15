class Cliente {
    #nome
    #cpf
    #dataNascimento
    #endereco
    #email
    #rendaAnual
    #nivelEscolaridade

    constructor(nome, cpf, dataNascimento, endereco, email, rendaAnual, nivelEscolaridade) {
        this.nome = nome
        this.cpf = cpf
        this.dataNascimento = dataNascimento
        this.endereco = endereco
        this.email = email
        this.rendaAnual = rendaAnual
        this.nivelEscolaridade = nivelEscolaridade
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

    get cpf() {
        return this.#cpf
    }
    set cpf(cpf) {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/  // Formato: XXX.XXX.XXX-XX, 
        // \d representa um dígito, {3} indica que deve haver exatamente 3 dígitos, 
        // \. é para escapar o ponto, - é para o hífen, e {2} 
        // indica que deve haver exatamente 2 dígitos no final.  
        // ^ indica o início da string. $ indica o fim da string. / delimita a expressão regular.
        if (cpfRegex.test(cpf)) {  // O método test() verifica se a string cpf corresponde ao formato definido pela expressão regular cpfRegex.
            this.#cpf = cpf
        } else {
            throw new Error('CPF deve estar no formato XXX.XXX.XXX-XX')
        }
    }

    get dataNascimento() {
        return this.#dataNascimento
    }
    set dataNascimento(dataNascimento) {
        const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/  // Formato: DD/MM/AAAA,
        if (dataRegex.test(dataNascimento)) {
            this.#dataNascimento = dataNascimento
        } else {
            throw new Error('Data de nascimento deve estar no formato DD/MM/AAAA')
        }
    }

    get endereco() {
        return this.#endereco
    }
    set endereco(endereco) {
        if (endereco.length >= 5) {
            this.#endereco = endereco
        } else {
            throw new Error('O endereço deve conter pelo menos 5 caracteres')
        }
    }

    get email() {
        return this.#email
    }
    set email(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Formato: nome@dominio.com
        if (emailRegex.test(email)) {
            this.#email = email
        } else {
            throw new Error('Email inválido')
        }
    }

    get rendaAnual() {
        return this.#rendaAnual
    }
    set rendaAnual(rendaAnual) {
        if (rendaAnual >= 0) {
            this.#rendaAnual = rendaAnual
        } else {
            throw new Error('A renda anual deve ser um valor positivo')
        }
    }

    get nivelEscolaridade() {
        return this.#nivelEscolaridade
    }
    set nivelEscolaridade(nivelEscolaridade) {
        const niveisValidos = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-Graduação']
        if (niveisValidos.includes(nivelEscolaridade)) {
            this.#nivelEscolaridade = nivelEscolaridade
        } else {
            throw new Error('Nível de escolaridade inválido')
        }
    }

    toString = () => `
    Cliente: ${this.nome}
    CPF: ${this.cpf}
    Data de Nascimento: ${this.dataNascimento}
    Endereço: ${this.endereco}
    Email: ${this.email}
    Renda Anual: R$${this.rendaAnual.toFixed(2)}
    Nível de Escolaridade: ${this.nivelEscolaridade}`
}

try {
cliente1 = new Cliente('Miguel Netto', '123.456.789-00', '31/03/1993', 'Rua Frei caneca, 305', 'jmiguelpnetto@gmail.com', 60000, 'Pós-Graduação')
console.log(cliente1.toString())
} catch (error) {
    console.log(error.message)
}
