export interface Category {
    id:number
    name:string
}

export interface RandomMovie {
    id:number,
    title:string,
    description:string,
    image:string,
    video:string
}

export type videoResponseType = {
    id:number
    name:string
    key:string,
    type:string
}
export interface PreviewCard {
    id:number
    title:string
    image:string
}
export interface MiniCard {
    // image:string
    genres:number[]
    // id:number
    // title:string
    date:string
    rate:number
}
export interface BigCard {
    language:string
    description:string
    country:string
    status:string
    cast: {
        first: string[]
        full: string[]
    }
    similar:similarMovieInterface[]
    videos: videoResponseType[]
}
export interface similarMovieInterface {
    id:number
    image:string
    title:string
    date:string
    description:string
}