import { appDeleteRequest, appGetRequest, appPostRequest, appPutRequest } from "../../Core/services/appRequest";

export function getLicenciaturas(){
    const request = appGetRequest('/api/licenciaturas')

    return (
        fetch(request)
        .then((response) => {
            // console.log(response)
            return response.json()
        })

    )
}

export function postLicenciatura(newLicenciatura){
    const request = appPostRequest('/api/licenciaturas', null, newLicenciatura)

    return (
        fetch(request)
        .then(response => {
            if(!response.ok){
                response.json().then((data) => {
                    throw new Error(data.error)
                })
            }
            
            return response.json()
            
        })
    )
}

export function putLicenciatura(clave, newLicenciaturaData){
    const request = appPutRequest(`api/licenciaturas/${clave}`, null, newLicenciaturaData)

    return (
        fetch(request)
        .then(response => {
            if(!response.ok){
                response.json().then((data) => {
                    throw new Error(data.error)
                })
            }
            
            return response.json()
            
        })
    )
}

export function deleteLicenciatura(clave){
    const request = appDeleteRequest(`api/licenciaturas/${clave}`)

    return (
        fetch(request)
        .then(response => {
            if(!response.ok){
                response.json().then((data) => {
                    throw new Error(data.error)
                })
            }
            
            return response.json()
            
        })
    )    
}
