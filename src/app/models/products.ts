export class Product {
    id: number;
    category: string;
    cost: number;
    inPromotion: boolean;
    longDescription: string;
    mark: any;
    name: string;
    picturePath: string;
    promotionPourcentage: number;
    shortDescription: string;


    static dataToDisplay(prod) {
        if (prod) {
        const resultats = new Array(new Product());
        prod.forEach(el => {
            const resultat = new Product();
            resultat.id = el.id;
            resultat.name = el.name;
            resultat.cost = el.cost;
            resultat.category = el.category;
            resultat.inPromotion = el.inPromotion;
            resultat.mark = el.mark;
            resultats.push(resultat);
        });
        resultats.splice(0, 1);
        return resultats;
        }
    }
}
