
export interface IProduct{
    id:string,
    name:string,
    description:string,
    color:string,
    categoryId:string,
    category:TCategory,
    price:number,
    stock:number,
    imgs:string[],
    onSale:boolean,
    priceOnSale?:number,
    size?:string,
    available?:boolean,



}

export type TCategory={
    id:string,
    name:string,
    categoryImage:string,
    products:IProduct[]
}