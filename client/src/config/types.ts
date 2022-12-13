export interface homeMovie {
    error:boolean
    loading:boolean
    data: {
        id:number
        title:string
        description:string
        image:string
        video:string
    }
}

export type categorieType = {
    id:number,
    name:string
}
export interface Categories {
    error:boolean
    loading:boolean
    data: categorieType[]
}

export interface MiniCardInterface {
    image:string
    genres:number[]
    id:number
    title:string
    date:string
    rate:number
}
export interface CardList {
    name:string
    data:MiniCardInterface[]
    loading:boolean
    error:boolean
}
export interface Movies {
    homeMovie:homeMovie
    categories:Categories
    lists:{
        [key:string]:CardList
    }
}
