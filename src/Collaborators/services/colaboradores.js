import { appGetRequest, appPostRequest, appPutRequest } from "../../services/appRequest";

export function getColaboradores(){

    const request = appGetRequest('/api/colaboradores')

    return (
        fetch(request)
        .then((response) => {
            // console.log(response)
            return response.json()
        })

    )

}

export function postColaborador(colaborador){

    const request = appPostRequest('api/colaboradores', false, colaborador)

    console.log('From postColaborador: ',colaborador)
    
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


export function putColaborador(colaborador){
    const matricula = colaborador.matricula
   
    console.log('From putColaborador: ',colaborador)
    console.log('From putColaborador: ',matricula)
    const request = appPutRequest(`api/colaboradores/${matricula}`, false, colaborador)

    console.log('From putColaborador: ',colaborador)
    
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
