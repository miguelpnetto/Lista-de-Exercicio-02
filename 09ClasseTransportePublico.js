class Veiculo {
    #placa
    #modelo
    #capacidade
    #passageirosAtuais

    constructor(placa, modelo, capacidade) {
        this.placa = placa
        this.modelo = modelo
        this.capacidade = capacidade
        this.#passageirosAtuais = 0
    }

    get placa() {
        return this.#placa
    }
    set placa(placa) {
        const placaRegex = /^[A-Z]{3}-\d{1}[A-Z]{1}\d{2}$/
        if (typeof placa === 'string' && placaRegex.test(placa)) {
            this.#placa = placa
        } else {
            throw new Error('Placa deve seguir o padrão "ABC-1D34".')
        }
    }

    get modelo() {
        return this.#modelo
    }
    set modelo(modelo) {
        if (modelo === 'onibus' || modelo === 'metro') {
            this.#modelo = modelo
        } else {
            throw new Error('Modelo deve ser "onibus" ou "metro".')
        }
    }

    get capacidade() {
        return this.#capacidade
    }
    set capacidade(capacidade) {
        if (typeof capacidade === 'number' && capacidade > 0) {
            this.#capacidade = capacidade
        } else {
            throw new Error('Capacidade deve ser um número positivo.')
        }
    }

    get passageirosAtuais() {
        return this.#passageirosAtuais
    }
    set passageirosAtuais(passageirosAtuais) {
        if (typeof passageirosAtuais === 'number' && passageirosAtuais >= 0 && passageirosAtuais <= this.capacidade) {
            this.#passageirosAtuais = passageirosAtuais
        } else {
            throw new Error('Passageiros atuais deve ser um número entre 0 e a capacidade do veículo.')
        }
    }

    verificarLotacao = (numeroDePassageiros) => {
        if (typeof numeroDePassageiros === 'number' && numeroDePassageiros >= 0) {
            return this.passageirosAtuais + numeroDePassageiros <= this.capacidade
        } else {
            throw new Error('Número de passageiros a verificar deve ser um número não negativo.')
        }
    }

    adicionarPassageiros = (numeroDePassageiros) => {
        if (this.verificarLotacao(numeroDePassageiros)) {
            this.passageirosAtuais += numeroDePassageiros
        } else {
            throw new Error('Número de passageiros excede a capacidade do veículo.')
        }
    }

    verificarLimiteLotacao = (passageirosAtuais) => {
        if (passageirosAtuais > this.capacidade) {
            throw new Error('Número de passageiros excede a capacidade do veículo.')
        } else if (passageirosAtuais === this.capacidade) {
            return 'Número de passageiros atingiu o limite de lotação.'
        } else {    
            return 'Número de passageiros dentro do limite de lotação.'
        }
    }

}
class Onibus extends Veiculo {
    #linha

    constructor(placa, modelo, capacidade, linha) {
        super(placa, modelo, capacidade)
        this.#linha = linha
    }

    get linha() {
        return this.#linha
    }
    set linha(linha) {
        if (typeof linha === 'string' && linha.length > 0) {
            this.#linha = linha
        } else {
            throw new Error('Linha deve ser uma string não vazia.')
        }
    }

    toString = () => `Ônibus : 
    Placa: ${this.placa}
    Modelo: ${this.modelo}
    Capacidade: ${this.capacidade}
    Linha: ${this.linha}`
}
class Metro extends Veiculo {
    #numeroDeVagoes

    constructor(placa, modelo, capacidade, numeroDeVagoes) {
        super(placa, modelo, capacidade)
        this.numeroDeVagoes = numeroDeVagoes
    }

    get numeroDeVagoes() {
        return this.#numeroDeVagoes
    }
    set numeroDeVagoes(numeroDeVagoes) {
        if (typeof numeroDeVagoes === 'number' && numeroDeVagoes > 0) {
            this.#numeroDeVagoes = numeroDeVagoes
        } else {
            throw new Error('Número de vagões deve ser um número positivo.')
        }
    }

    toString = () => `Metrô : 
    Placa: ${this.placa}
    Modelo: ${this.modelo}
    Capacidade: ${this.capacidade}
    Número de vagões: ${this.numeroDeVagoes}`
}
class Bilhete {
    #codigo
    #saldo

    constructor(codigo, saldo) {
        this.codigo = codigo
        this.saldo = saldo
    }

    get codigo() {
        return this.#codigo
    }
    set codigo(codigo) {
        const codigoRegex = /^[A-Z0-9]{8}$/
        if (typeof codigo === 'string' && codigoRegex.test(codigo)) {  // Verifica se o código é uma string de 8 caracteres alfanuméricos
            this.#codigo = codigo
        } else {
            throw new Error('Código deve seguir o padrão "ABCDEFGH".')
        }
    }

    get saldo() {
        return this.#saldo
    }
    set saldo(saldo) {
        if (typeof saldo === 'number' && saldo >= 0) {
            this.#saldo = saldo
        } else {
            throw new Error('Saldo deve ser um número não negativo.')
        }
    }

    recarregarSaldo = (valor) => {
        if (typeof valor === 'number' && valor > 0) {
            this.saldo += valor
        } else {
            throw new Error('Valor de recarga deve ser um número positivo.')
        }
    }

    verificarSaldo = (valor) => {
        if (typeof valor === 'number' && valor > 0) {
            return this.saldo >= valor
        } else {
            throw new Error('Valor a verificar deve ser um número positivo.')
        }
    }
}

try {
    novoOnibus1 = new Onibus('ABC-1D34', 'onibus', 50, 'Linha 1')
    console.log(novoOnibus1.toString())
    console.log(`Verificação de lotação do ônibus: ${novoOnibus1.verificarLotacao(30)}`)
    novoOnibus1.adicionarPassageiros(30)
    novoOnibus1.adicionarPassageiros(20)
    //novoOnibus1.adicionarPassageiros(1) // Deve lançar um erro
    console.log(`Passageiros atuais no ônibus: ${novoOnibus1.passageirosAtuais}`)
    console.log(`Limite de lotação do ônibus: ${novoOnibus1.verificarLimiteLotacao()}`)

    novoMetro1 = new Metro('XYZ-2A56', 'metro', 200, 4)
    console.log(novoMetro1.toString())
    console.log(`Verificação de lotação do metrô: ${novoMetro1.verificarLotacao(150)}`)
    novoMetro1.adicionarPassageiros(150)
    novoMetro1.adicionarPassageiros(50)
    //novoMetro1.adicionarPassageiros(1) // Deve lançar um erro
    console.log(`Passageiros atuais no metrô: ${novoMetro1.passageirosAtuais}`)
    console.log(`Limite de lotação do metrô: ${novoMetro1.verificarLimiteLotacao()}`)

    bilhete1 = new Bilhete('ASDFGHHJ', 0)
    console.log(`Código do bilhete: ${bilhete1.codigo}, Saldo: ${bilhete1.saldo}`)
    bilhete1.recarregarSaldo(50)
    console.log(`Saldo após recarga: ${bilhete1.saldo}`)
    console.log(`Verificação de saldo para valor 100: ${bilhete1.verificarSaldo(100)}`)
} catch (error) {
    console.error(error.message)
}
