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