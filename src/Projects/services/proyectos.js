import { appGetRequest, appPostRequest, appPutRequest, appDeleteRequest } from "../../services/appRequest";

export async function getProyectos(){
    const request = appGetRequest('api/proyectos')

    return (
        fetch(request)
            .then(async (res) => {
                if (res.ok) return res.json()
                const error = await res.json()
                throw new Error(error)
            })
    )
}


export async function postProyecto(newProject){
    const request = appPostRequest('api/proyectos', null, newProject)

    return (
        fetch(request)
            .then(async (res) => {
                if (res.ok) return res.json()
                const error = await res.json()
                throw new Error(error)
            })
    )
}

export async function putProyecto(newProjectData){
    const id = newProjectData.id
    newProjectData.id = undefined
    const request = appPutRequest(`api/proyectos/${id}`, null, newProjectData)

    return (
        fetch(request)
            .then(res => {
                if (res.ok) return res.json()
                res.json()
                    .then(data => {
                        throw new Error(data.error)
                    })
            })
            .catch(err => console.log(err))
    )
}

export async function deleteProyecto(projectId){
    const request = appDeleteRequest(`api/proyectos/${projectId}`)
    return (
        fetch(request)
        .then(res => {
            if (res.ok) return res.json()
                res.json()
                    .then(data => {
                        throw new Error(data.error)
                    })
        })
    )
}