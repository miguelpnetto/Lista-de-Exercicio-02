class ContaCorrente {
    #numeroConta
    #saldo
    #limite
    #historico

    constructor(numeroConta, saldoInicial, limite) {
        if (saldoInicial < 0) {
            throw new Error("O saldo inicial não pode ser negativo.") // Verifica se o saldo inicial é negativo
        } else {
            this.#numeroConta = numeroConta
        }
        if (limite < 0) {
            throw new Error("O limite não pode ser negativo.")  // Verifica se o limite é negativo
        } else {
            this.#limite = limite
        }
        this.#saldo = saldoInicial
        this.#historico = []
    }

    get numeroConta() {
        return this.#numeroConta
    }
    set numeroConta(numeroConta) {
        this.#numeroConta = numeroConta
    }
    get saldo() {
        return this.#saldo
    }
    set saldo(saldo) {
        this.#saldo = saldo
    }
    get historico() {
        return this.#historico
    }
    set historico(historico) {
        this.#historico = historico
    }
    get limite() {
        return this.#limite
    }
    set limite(limite) {
        if (limite >= 0) {
            this.#limite = limite
        }
    }

    depositar(valor) {  // Método para realizar um depósito, verificando se o valor é positivo
        if (valor > 0) {
            this.#saldo += valor
            this.#historico.push(`Depósito: R$ ${valor.toFixed(2)}`)
        } else {
            throw new Error("O valor do depósito deve ser positivo.")
        }
    }

    sacar(valor) {  // Método para realizar um saque, verificando o saldo e o limite
        if (valor > 0) {
            if (this.#saldo + this.#limite >= valor) {
                this.#saldo -= valor
                this.#historico.push(`Saque: R$ ${valor.toFixed(2)}`)
            } else {
                throw new Error("Saldo insuficiente para o saque.")
            }
        } else {
            throw new Error("O valor do saque deve ser positivo.")
        }
    }

    transferir(valor, contaDestino) {  // Método para realizar uma transferência, verificando o saldo e o limite
        if (valor > 0) {
            if (this.#saldo + this.#limite >= valor) {
                this.sacar(valor)
                contaDestino.depositar(valor)
                this.#historico.push(`Transferência: R$ ${valor.toFixed(2)} para a conta ${contaDestino.numeroConta}`)
            } else {
                throw new Error("Saldo insuficiente para a transferência.")
            }
        } else {
            throw new Error("O valor da transferência deve ser positivo.")
        }
    }

    exibirHistorico() {  // Método para exibir o histórico de transações formatadas
        console.log(`Histórico da Conta ${this.#numeroConta}:`)
        this.#historico.forEach((transacao, index) => {
            console.log(`${index + 1}. ${transacao}`)
        }) 
    }

    toString() {  // Método para exibir as informações da conta de forma legível
        return `Conta Corrente :
        Número: ${this.#numeroConta} 
        Saldo: R$ ${this.#saldo.toFixed(2)}
        Limite: R$ ${this.#limite.toFixed(2)}`
    }
}

let conta1 = new ContaCorrente("12345-6", 1000, 5000)

conta1.depositar(500)
conta1.sacar(200)
conta1.exibirHistorico()
console.log(conta1.toString())