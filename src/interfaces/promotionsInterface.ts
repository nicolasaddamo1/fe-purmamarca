export interface IPromotionDTO{
    name:string,
    image_url:string,
    category_ids?:string[],
    start_date:string,
    expiration_date:string,
    promo_percentage?:string
}

export interface IPromotion extends IPromotionDTO{
    id:string,
}
