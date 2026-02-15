class ContaCorrente {
    #numeroConta
    #saldo
    #limite
    #historico

    constructor(numeroConta, saldoInicial, limite) {
        this.numeroConta = numeroConta
        this.limite = limite
        this.saldo = saldoInicial
        this.historico = []
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
        if (saldo >= 0) {
            this.#saldo = saldo
        } else {
            throw new Error("O saldo deve ser um valor positivo.")
        }
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
        } else {
            throw new Error("O limite deve ser um valor positivo ou zero.")
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
            if ((this.#saldo + this.#limite) >= valor) {
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
            if (this.#saldo >= valor) {  // Verifica se há saldo suficiente para a transferência
                this.sacar(valor)
                contaDestino.depositar(valor)
                this.#historico.push(`Transferência: R$ ${valor.toFixed(2)} para a conta ${contaDestino.numeroConta}`)
            } else {
                throw new Error("Saldo insuficiente para a transferência.")
            }
        } else {
            throw new Error("O valor da transferência deve ser maior que zero.")
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

try {
    conta1 = new ContaCorrente("12345-6", 500, 2500)

    conta1.depositar(100)
    conta1.sacar(200)
    conta1.exibirHistorico()
    console.log(conta1.toString())

    conta2 = new ContaCorrente("65432-1", 500, 1000)

    conta1.transferir(200, conta2)
    conta1.exibirHistorico()
    console.log(conta1.toString())
    console.log(conta2.toString())
} catch (error) {
    console.log(error.message)
}

