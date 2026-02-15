class Data {
    dia
    mes
    ano

    constructor(dia, mes, ano) {
        this.dia = dia
        this.mes = mes
        this.ano = ano
    }

    //get e set de dia
    get dia () {
        return this.dia
    }
    set dia (dia) {
        if (dia > 0 && dia <= 31) {
            this.dia = dia
        } else {
            throw new Error("O dia deve ser entre 1 e 31")
        }
    }
    //get e set de mes
    get mes() {
        return this.mes
    }
    set mes(mes) {
        if (mes > 0 && mes <= 12) {  
            this.mes = mes
        } else {
            throw new Error("O mês deve ser entre 1 e 12")
        }
    }
    //get e set de ano
    get ano() {
        return this.ano
    }
    set ano(ano) {
        if (ano > 0 && ano <= new Date().getFullYear()) {  //new Date().getFullYear() retorna o ano atual do sistema, garantindo que o ano seja válido e não futuro.
            this.ano = ano  
        } else {
            throw new Error("O ano deve ser maior que zero e menor ou igual ao ano atual")
        }
    }

    toString = () => `${this.dia}/${this.mes}/${this.ano}`
}

dia1 = new Data(31, 3, 1993)
console.log(dia1.toString())