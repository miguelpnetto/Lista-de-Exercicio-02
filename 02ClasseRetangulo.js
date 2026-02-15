class Retangulo {
    #base
    #altura
    
    constructor(base, altura) {
        this.#base = base
        this.#altura = altura
    }

    // get e set para a base
    get base() {   //get é um método para acessar o valor de uma propriedade privada
        return this.#base
    }
    set base(base) {  //set é um método para atribuir um valor a uma propriedade privada
        if (base > 0) {  //verifica se o valor é maior que 0, para evitar valores negativos ou zero
            this.#base = base
        } else {
            throw new Error("A base deve ser maior que 0") //lança um erro caso a base seja menor ou igual a 0
        }
    }
    // get e set para a altura
    get altura() {
        return this.#altura
    }
    set altura(altura) {
        if (altura > 0) {
            this.#altura = altura
        } else {
            throw new Error("A altura deve ser maior que 0") // throw new Error é usado para lançar um erro personalizado.
        }
    }

    // métodos para calcular a área, perímetro e verificar se é um quadrado
    calcularArea = () => this.#base * this.#altura 
    calcularPerimetro = () => 2 * (this.#base + this.#altura)
    ehQuadrado = () => this.#base === this.#altura

    // método para redimensionar o retângulo
    redimensionar = (fator) => {
        if (fator > 0) {
            this.#base *= fator
            this.#altura *= fator
        } else {
            throw new Error("O fator de redimensionamento deve ser maior que 0")
        }
    }

    // método para exibir as informações do retângulo
    toString = () => `
    Base: ${this.#base} 
    Altura ${this.#altura}
    Área: ${this.calcularArea()}
    Perímetro: ${this.calcularPerimetro()}
    Tipo: ${this.ehQuadrado() ? "Quadrado" : "Retângulo"} `
}

formato1 = new Retangulo(4,6)
console.log(formato1.toString())
formato1.redimensionar(2)
console.log(formato1.toString())

formato2 = new Retangulo(5,5)
console.log(formato2.toString())