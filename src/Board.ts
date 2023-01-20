import {GeneratorT, Tile} from "./Generator";

export interface BoardT<T1,T2,T3>{
    width:number
    height:number
    generator: GeneratorT<T1, T2, T3>
    tiles: Tile<T1|T2|T3>[]
}

export class Board<T1,T2,T3> implements BoardT<T1, T2, T3>{
    height: number;
    width: number;
    generator: GeneratorT<T1, T2, T3>;
    tiles: Tile<T1 | T2 | T3>[];


    constructor(height: number, width: number, generator: GeneratorT<T1, T2, T3>) {
        this.height = height;
        this.width = width;
        this.generator = generator;
        this.tiles = this.initialLoad()
    }
    initialLoad = ():Tile<T1|T2|T3>[] => {
        let tempArr: Tile<T1|T2|T3>[]
        for (let i = 0; i < this.height * this.width; i++) {
            tempArr.push(this.generator.next())
        }
        return tempArr
    }
}