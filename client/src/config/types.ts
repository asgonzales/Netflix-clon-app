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

export type categoryType = {
    id:number,
    name:string
}
export interface Categories {
    error:boolean
    loading:boolean
    data: categoryType[]
}
// export interface PreviewCardInterface {
//     id:number
//     title:string
//     image:string
// }
// export interface MiniCardInterface {
//     image?:string
//     genres?:number[]
//     id?:number
//     title?:string
//     date?:string
//     rate?:number
// }
export interface MovieInfoInterface {
    id:number
    title:string
    image:string
    genres?:number[]
    date?:string
    rate?:number

}
export interface CardList {
    name:string
    data:MovieInfoInterface[]
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
//Redux interfaces
export interface getMovieInfoArgs {
    categoryName:string
    movieId:number
}
export interface SimilarCardInterface {
    id:number
    image:string
    title:string
    description:string
    date:string
}