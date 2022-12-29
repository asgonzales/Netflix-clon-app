// export default listadePrueba = [
//     {
//         image:'not',
//         genres: [5, 6, 3],
//         id:57,
//         title: 'Prueba',
//         date:'10-05-20000',
//         rate:7
//     },

import { MovieInfoInterface } from "../../config/types"

// ]
let listaDePrueba:MovieInfoInterface[] = []
for (let i = 0; i < 42; i++) {
    listaDePrueba.push({
        image:'not',
        genres: [5, 6, 3],
        id:57,
        title: `${i + 1}`,
        date:'10-05-20000',
        rate:7
    })
}
export default listaDePrueba