/*
export const isEven = (x: number) => x % 2 === 0;
console.log( isEven(2));
*/
/*

6:Make a request to https://swapi.dev/api/people/1/


Display, Name in a console.log()
Bonus: Could you display name(s) of starships for people/1?

Need a hint? try starships/12/ starships/22/

GET /api/people/1/

{
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "homeworld": "https://swapi.dev/api/planets/1/",
    "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
    ],
    "species": [],
    "vehicles": [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
    ],
    "starships": [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
    ],
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-20T21:17:56.891000Z",
    "url": "https://swapi.dev/api/people/1/"
}
* */
(function () {
    const END_POINT = 'https://swapi.dev/api/people/1/'

    fetch(END_POINT)
        .then(response => response.json())
        .then(people => {
            console.log("Name:", people.name);
            if (!people.starships || people.starships.length === 0) {
                return [];
            }
            const starshipPromises = people.starships.map(starshipUrl => {
                return fetch(starshipUrl)
                    .then(response => response.json())
                    .then(starshipData => starshipData.name)
                    .catch(error => {
                        console.log('An error occurred:', error);
                        return null;
                    });
            });

            // @ts-ignore
            return Promise.all(starshipPromises);
        })
        .then(starshipNames => {
            console.log("Starships:");
            if (!starshipNames || starshipNames.length === 0) {
                console.log('None');
                return;
            }

            starshipNames.forEach(starshipName => {
                if (starshipName) {
                    console.log(starshipName);
                }
            });
        })
        .catch(error => {
            console.log('An error occurred:', error);
        });
})();