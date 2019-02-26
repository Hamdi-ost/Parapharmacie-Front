export class User {
    id: number;
    username: string;
    email: string;

    static dataToDisplay(prod) {
        if (prod) {
        const resultats = new Array(new User());
        prod.forEach(el => {
            const resultat = new User();
            resultat.id = el.id;
            resultat.username = el.username;
            resultat.email = el.email;
            resultats.push(resultat);
        });
        resultats.splice(0, 1);
        return resultats;
        }
    }
}
