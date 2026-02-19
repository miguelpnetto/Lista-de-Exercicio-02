const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class Personagem {
    constructor(nome, pontosVida, forca) {
        if (new.target === Personagem) {
            throw new Error('Personagem é uma classe abstrata e não pode ser instanciada diretamente.')
        }

        this.nome = nome
        this.pontosVida = pontosVida
        this.forca = forca
        this.vidaInicial = this.pontosVida
        this.forcaInicial = this.forca
        this.xp = 0
        this.level = 1
    }

    atacar = () => {
        throw new Error('Alvo deve ser uma instância de Personagem.')
    }

    defender = () => {
        throw new Error('Defender deve ser implementado por subclasses.')
    }

    ganharXP = (quantidade) => {
        this.xp += quantidade
        console.log(`✨ ${this.nome} ganhou ${quantidade} de XP! Total: ${this.xp}`)

        if (this.xp >= 100) this.levelUp()
    }

    levelUp = () => {
        this.level++
        this.xp -= 100
        if (this instanceof Guerreiro) {
            this.vidaInicial += 50
            this.forcaInicial += 30
        } else if (this instanceof Mago) {
            this.vidaInicial += 30
            this.forcaInicial += 60
        }

        console.log(`
                --- 🆙 SUBIU DE NÍVEL 🆙 ---
            ${this.nome} agora está no nivel ${this.level}
            Subiu força: ${this.forcaInicial} | Subiu a vida: ${this.vidaInicial}`)
    }
}

class Guerreiro extends Personagem {
    constructor(nome, pontosVida, forca) {
        super(nome, pontosVida, forca)
    }

    atacar = () => {
        return this.forca + Math.floor(Math.random() * 10)
    }

    defender = (alvo) => {
        const defesa = this.forca + Math.floor(Math.random() * 5) // Defesa aleatória baseada na força do guerreiro
        const forcaAtaque = alvo.atacar()
        if (forcaAtaque > defesa) {
            const danoTomado = forcaAtaque - defesa
            this.pontosVida -= danoTomado
            console.log(`🛡️ ${this.nome} tentou defender, mas ainda recebeu ${danoTomado} de dano. 🛡️`)
        } else {
            console.log(`🛡️ ${this.nome} defendeu o ataque com sucesso! 🛡️`)
        }
    }
}

class Mago extends Personagem {
    constructor(nome, pontosVida, forca) {
        super(nome, pontosVida, forca)
    }

    atacar = () => {
        return this.forca
    }

    defender = (alvo) => {
        const defesa = 10
        const forcaAtaque = alvo.atacar()
        if (forcaAtaque > defesa) {
            const danoTomado = forcaAtaque - defesa
            this.pontosVida -= danoTomado
            console.log(`🛡️ ${this.nome} tentou defender, mas ainda recebeu ${danoTomado} de dano. 🛡️`)
        } else {
            console.log(`🛡️ ${this.nome} defendeu o ataque com sucesso! 🛡️`)
        }
    }

    lancarFeitico = (alvo) => {
        if (alvo instanceof Personagem) {
            const dano = 60
            alvo.pontosVida -= dano
            console.log(`🔥 ${this.nome} lançou um feitiço em ${alvo.nome} causando ${dano} de dano. 🔥`)
        }
    }

    curar = (personagem) => {
        const cura = 40
        personagem.pontosVida += cura
        console.log(`💚 ${this.nome} se curou, recuperando ${cura} pontos de vida. 💚`)
    }
}

class Item {
    constructor(nome, tipo, valor, efeito) {
        this.nome = nome
        this.tipo = tipo
        this.valor = valor
        this.efeito = efeito
    }

    usar = (personagem) => {
        if (personagem instanceof Personagem) {  // Verifica se o personagem é uma instância de Personagem
            switch (this.tipo) {
                case 'arma':
                    personagem.forca += this.efeito
                    console.log(`${personagem.nome} equipou ${this.nome} e ganhou ${this.efeito} de força.`)
                    break
                case 'pocao':
                    personagem.pontosVida += this.efeito
                    console.log(`🧪 ${personagem.nome} usou ${this.nome} e recuperou ${this.efeito} pontos de vida. 🧪`)
                    break
                default:
                    console.log(`Efeito desconhecido para o item ${this.nome}.`)
            }
        } else {
            throw new Error('Personagem deve ser uma instância de Personagem.')
        }
    }
}

class Batalha {
    constructor(personagem1, personagem2) {
        if (personagem1 instanceof Personagem && personagem2 instanceof Personagem) {  // Verifica se ambos os participantes são instâncias de Personagem
            this.personagem1 = personagem1
            this.personagem2 = personagem2
        } else {
            throw new Error('Ambos os participantes devem ser instâncias de Personagem.')
        }
    }

    iniciar = async () => {
        console.log(`⚔️ A batalha entre ${this.personagem1.nome} e ${this.personagem2.nome} começou! ⚔️`)
        console.log("--------------------------------------------------")
        // A batalha continua até que um dos personagens tenha seus pontos de vida reduzidos a zero ou menos
        while (this.personagem1.pontosVida > 0 && this.personagem2.pontosVida > 0) {

            await esperar(1200)

            const chanceDefesa = Math.random() < 0.4 // 40% de chance de defesa bem-sucedida
            const chanceCurar = Math.random() < 0.1 // 10% de chance de cura bem-sucedida 
            const usarItem = Math.random() < 0.3 // 30% de chance de usar um item durante a batalha  
            const chanceFeitico = Math.random() < 0.7 // 70% de chance de lançar um feitiço durante a batalha (apenas para magos)
            const chanceItem = Math.random() < 0.5 // 50% de chance de escolher um item de ataque ou cura
            if (chanceDefesa) {
                this.personagem2.defender(this.personagem1)
            } else {
                const dano = this.personagem1.atacar()
                this.personagem2.pontosVida -= dano
                console.log(`💥 ${this.personagem1.nome} causou ${dano} de dano em ${this.personagem2.nome} 💥`)
            }
            if (this.personagem2.pontosVida <= 0) {
                console.log(`💀 ${this.personagem2.nome} foi derrotado! 🏆 ${this.personagem1.nome} venceu a batalha.`)
                await esperar(1000)
                this.personagem1.ganharXP(100)
                break
            } else if (usarItem) {
                if (chanceItem) {
                    const item = new Item('Andûril', 'arma', 100, 15)
                    item.usar(this.personagem1)
                } else {
                    const item = new Item('Poção de Vida', 'pocao', 50, 30)
                    item.usar(this.personagem1)
                }
            }

            await esperar(800)
            // O mago tem uma chance de lançar um feitiço ou atacar normalmente
            if (chanceDefesa) {
                this.personagem1.defender(this.personagem2)
            } else {
                if (chanceFeitico) {
                    this.personagem2.lancarFeitico(this.personagem1)
                } else {
                    const dano = this.personagem2.atacar()
                    this.personagem1.pontosVida -= dano
                    console.log(`💥 ${this.personagem2.nome} causou ${dano} de dano em ${this.personagem1.nome} 💥`)
                }
            }
            if (this.personagem1.pontosVida <= 0) {
                console.log(`💀 ${this.personagem1.nome} foi derrotado! 🏆 ${this.personagem2.nome} venceu a batalha.`)
                await esperar(500)
                this.personagem2.ganharXP(100)
                break
            }
            // O mago tem uma chance de se curar ou usar um item durante a batalha
            if (chanceCurar && this.personagem2.pontosVida < 50) {
                this.personagem2.curar(this.personagem2) // O mago tenta se curar durante a batalha
            } else if (usarItem) {
                if (chanceItem) {
                    const item = new Item('Cajado do Mago', 'arma', 100, 30)
                    item.usar(this.personagem2)
                } else {
                    const item = new Item('Poção de Vida', 'pocao', 50, 20)
                    item.usar(this.personagem2)
                }
            }
        }
    }
}

const rodarBatalha = async () => {
    try {
        const guerreiro1 = new Guerreiro('Aragorn', 100, 20)
        const mago1 = new Mago('Gandalf', 80, 30)
        const batalha = new Batalha(guerreiro1, mago1)
        batalha.iniciar()
    } catch (error) {
        console.error(error.message)
    }
}

rodarBatalha()