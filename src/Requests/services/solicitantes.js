import { appGetRequest, appPostRequest } from "../../services/appRequest";


export function getAllSolicitantes(){
    
    const request = appGetRequest('/api/solicitantes')
    
    return (
        fetch(request)
        .then((response) => {
            // console.log(response)
            return response.json()
        })

    )
}

export function postSolicitante(solicitante){

    const request = appPostRequest('api/solicitantes', false, solicitante)

    console.log('From postSolicitante: ',solicitante)

    return (
        fetch(request)
        .then((response) => {
            if(response.ok){
                return response.json()
            }
            return {
                status: response.status,
                error: response.statusText
            }
        })
    )

}

