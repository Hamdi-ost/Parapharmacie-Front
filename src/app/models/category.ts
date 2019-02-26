export class Category {
    id: number;
    longDescription: string;
    name: string;
    shortDescription: string;

    static dataToDisplay(prod) {
        if (prod) {
        const resultats = new Array(new Category());
        prod.forEach(el => {
            const resultat = new Category();
            resultat.id = el.id;
            resultat.name = el.name;
            resultats.push(resultat);
        });
        resultats.splice(0, 1);
        return resultats;
        }
    }
}
