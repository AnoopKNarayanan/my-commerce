export class Product {
    id: number = 0;
    title: string = '';
    price: number = 0;
    description: string = '';
    category: string = '';
    image: string = '';
    rating: Rating = new Rating();
}

class Rating {
    rate: number = 0;
    count: number = 0;
}

export class Category {
    category: String = '';
    checked: boolean = false;
}

export class Range {
    start: number = 0;
    end: number = 0;
    checked: boolean = false;
}

export class PriceArr {
    startArr: Array<number> = new Array();
    endArr: Array<number> = new Array();
}

export class CartDetails {
    userId: number = 1;
    date: Date = new Date();
    products: Array<ProductDetails> = new Array();
}

export class ProductDetails {
    productId: number = 0;
    quantity: number = 0;
}
