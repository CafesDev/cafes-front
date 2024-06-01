import { appDeleteRequest, appGetRequest, appPostRequest, appPutRequest } from "../../Core/services/appRequest";

/**
 * @typedef IncludeOptions
 * @property {Boolean} colaborador
 * @property {Boolean} tarea
 * @property {Boolean} proyecto
 */

/**
 * 
 * @param {IncludeOptions} includeOptions 
 */
function preparIncludeQuery(includeOptions){
    let query = []
   const keys = ['colaborador', 'proyecto', 'tarea']
    keys.forEach((key) => {
        if(includeOptions[key]){
            query.push(`${key}=true`)
        }
    })
    query = query.join('&')
    return query
}

/**
 * 
 * @param {IncludeOptions} include
 */
export function getAllTareas(include) {
    const query = preparIncludeQuery(include)    
    const request = appGetRequest(`api/tarea-colaborador?${query}`)

    return fetch(request)
    .then((response) => {
        if (response.ok) return response.json()
    })
    .catch(err => {
        return err
    })
    .finally((value) => {
        console.log(value)
    })
}

/**
 * 
 * @param {Number} idProyecto 
 * @param {IncludeOptions} include
 */

export function getTareasForProyecto(idProyecto, include){
    const query = preparIncludeQuery(include)
    const request = appGetRequest(`api/tarea-colaborador/proyecto/${idProyecto}?${query}`)

    return fetch(request,{
        method: 'GET'
    })
    .then((response) => {
        if (response.ok) return response.json()
    })
    .catch(err => {
        return err
    })
}

/**
 * 
 * @param {Number} idColaborador 
 * @param {IncludeOptions} include
 */
export function getTareasForColaborador(idColaborador, include){
    const query = preparIncludeQuery(include)
    const request = appGetRequest(`api/tarea-colaborador/colaborador/${idColaborador}?${query}`)

    return fetch(request)
    .then((response) => {
        if (response.ok) return response.json()
    })
    .catch(err => {
        return err
    })
}

/**
 * @typedef {Object} CreatingTarea
 * @property {String} nombre
 * @property {String} descripcion
 * @property {Date} fecha_inicio
 * @property {Date} fecha_fin
 * @param {Number} id_colaborador
 * @param {Number} id_proyecto
 */

/**
 * @param {CreatingTarea} tarea
 */
export function postTarea(tarea){

    console.log(tarea)
    const createTareaRequest = appPostRequest(`api/tareas`, null, tarea)

    return fetch(createTareaRequest)
            .then((response) => {
                if (response.ok) return response.json()
                response.json().then(err => {
                    if(err.error){
                        throw new Error(err.error)
                    }
                })
            })
            .catch((err) => {
                console.log(err)
                return err
            })
}

export function deleteTarea(idTarea){
    const deleteTareaRequest = appDeleteRequest(`api/tareas/${idTarea}`)

    return fetch(deleteTareaRequest)
        .then((response) => {
            if (response.ok) return {tarea_eliminada: idTarea}
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}



/**
 * @typedef {Object} AsignacionColaborador
 * @property {Number} id_tarea 
 * @property {Number} id_colaborador 
 * 
 * @param {AsignacionColaborador} asignacion
 * 
 */

export function postAssignTareaToColaborador(asignacion){

    const assignTareaRequest = appPostRequest('api/tarea-colaborador', null, asignacion)

    return fetch(assignTareaRequest)
        .then((response) => {
            if (response.ok) return response.json()
            response.json().then((err) => {
                if (err.error)
                    throw new Error(err.error)
            })
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * 
 * @param {AsignacionColaborador} asignacion 
 */

export function deleteAssignmentFromColaborador(asignacion){

    const deleteAssignmentRequest = appDeleteRequest(`api/tarea-colaborador/`, null, asignacion)

    return (
        fetch(deleteAssignmentRequest)
        .then((response) => {
            if (response.ok) return response.json()
                response.json().then((errMessage) => {
                    if (errMessage.error){
                        throw new Error(errMessage.error)
                    }    
                })
        })
        .catch(err => {
            console.log(err)
        })
    )
}

/**
 * 
 * @param {Object} tareaData 
 * @param {Number} tareaId 
 */

export function putTarea(tarea){
    const tarea_id = tarea.id
    delete tarea.id


    const putTareaRequest = appPutRequest(`api/tareas/${tarea_id}`, null, tarea)

    return (
        fetch(putTareaRequest)
            .then((response) => {
                if(response.ok) {
                    console.log('response is ok')
                    return response.json()
                }
                response.json().then(error => {
                    throw new Error(error.error)
                })
            })
            .catch(err => {
                console.log(err)
            })
    )
}