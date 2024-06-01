import { appGetRequest } from "../../Core/services/appRequest";

export function getMunicipios(){
    const request = appGetRequest('/api/municipios')

    return (
        fetch(request)
        .then((response) => {
            return response.json()
        })

    )
}