export class Marque {
    id: number;
    name: string;

    static dataToDisplay(prod) {
        if (prod) {
        const resultats = new Array(new Marque());
        prod.forEach(el => {
            const resultat = new Marque();
            resultat.id = el.id;
            resultat.name = el.name;
            resultats.push(resultat);
        });
        resultats.splice(0, 1);
        return resultats;
        }
    }
}
