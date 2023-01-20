export interface GeneratorT<T1,T2,T3> {
    amount:number
    sequence:Tile<T1|T2|T3>[]
    randomType: () => T1 | T2 | T3
    generateSequence: () => void
    next: () => Tile<T1|T2|T3>
}

export interface Tile<T>{
    value:T,
    position:Position
}

export interface Position{
    column:number,
    row:number
}


export class Tile<T> implements Tile<T>{
    public value:T
    position:Position
    constructor(value:T,position:Position) {
        this.value = value
        this.position = position
    }
}

export class Generator<T1,T2,T3> implements GeneratorT<T1,T2,T3>{
    amount:number
    sequence:Tile<T1|T2|T3>[]
    valueT1: T1
    valueT2: T2
    valueT3: T3

    constructor(amount:number,value1:T1,value2:T2,value3:T3) {
        this.amount = amount
        this.valueT1 = value1
        this.valueT2 = value2
        this.valueT3 = value3
        this.generateSequence()
    }
    randomType = ():T1|T2|T3 => {
        const types = [this.valueT1,this.valueT2,this.valueT3]
        const randomIndex = Math.floor(Math.random() * types.length);
        return types[randomIndex];
    }

    generateSequence = () => {
        for (let i = 0; i < this.amount; i++) {
            const value = this.randomType()
            const tile = new Tile(value,{column:0,row:0})
            this.sequence.push(tile)
        }
    }
    next = (): Tile<T1 | T2 | T3> => {
        const lastIndex = this.sequence.length
        const lastTileInSequence = this.sequence[lastIndex]
        this.sequence.pop()
        return lastTileInSequence
    };
}