import { appGetRequest } from "../../services/appRequest";

export function getTiposServicio(){
    const request = appGetRequest('/api/tipos-servicios')

    return (
        fetch(request)
        .then((response) => {
            // console.log(response)
            return response.json()
        })

    )
}