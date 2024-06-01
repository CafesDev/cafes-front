import { appGetRequest } from "../../services/appRequest";

export function getTiposColaborador(){
    const request = appGetRequest('/api/tipos-colaborador')

    return (
        fetch(request)
        .then((response) => {
            // console.log(response)
            return response.json()
        })

    )
}
