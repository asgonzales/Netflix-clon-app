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