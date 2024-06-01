import { appGetRequest, appPostRequest, appPutRequest } from "../../services/appRequest";


export function getAllSolicitudes(){
    
    const request = appGetRequest('/api/solicitudes')
    
    return (
        fetch(request)
        .then((response) => {
            // console.log(response)
            return response.json()
        })

    )
}

export function postSolicitud(solicitud){

    const request = appPostRequest('api/solicitudes', false, solicitud)

    console.log('From postSolicitud: ',solicitud)

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

export function acceptRejectSolicitud(solicitud){

    const request = appPutRequest('/api/solicitudes', false, solicitud) 

    console.log('From putRequest: ',solicitud)
    
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