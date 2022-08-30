import AbmDemo from "./AbmDemo/AbmDemo";

export const configTable = {
    urls: [
        "/Texto/GetByIdTipoTexto/1?Pagina=1&RegistrosPorPagina=-1", // GET
        "/Texto", // POST 
        "/Texto", // PUT
        "/Texto" // DELETE
    ],
    grid: {
        columnConfig: ["id","nombre", "descripcion"], // cuidado con el orden de los strings
        searchField: ["nombre", "id", "descripcion"]
    },
    Abm: AbmDemo,
    textSize: 20
}