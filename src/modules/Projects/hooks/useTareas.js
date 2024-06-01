import { useQuery, useMutation } from "@tanstack/react-query"
import { deleteAssignmentFromColaborador, getTareasForProyecto, postAssignTareaToColaborador, postTarea, putTarea } from "../services/tareasServices"
import { useMemo } from "react"
import { deleteTarea as deleteTareaService } from "../services/tareasServices"

/**
 * @typedef {Object} Colaborador
 * @property {Number} matricula
 * @property {String} nombres
 * @property {String} apellido_paterno
 * @property {String} apellido_materno
 * @property {'Activo' | 'Inactivo'} estado
 * @property {String} clave_licenciatura
 * @property {String} correo_personal
 * @property {String} tipo
 */

/** 
 * @typedef {Object} Tarea
 * @property {Number} id
 * @property {String} nombre
 * @property {String} descripcion
 * @property {'Pendiente' | 'Iniciada' | 'Terminada'} estado
 * @property {Date | null} fecha_inicio
 * @property {Date | null} fecha_fin
 */


/**
 * @typedef {Object} ColaboradorWorkingOnProyecto
 * @property {Number} id_proyecto
 * @property {Number} matricula
 * @property {String} nombres
 * @property {String} apellido_paterno
 * @property {String} apellido_materno
 * @property {'Activo' | 'Inactivo'} estado
 * @property {String} clave_licenciatura
 * @property {String} correo_personal
 * @property {String} tipo
 * @property {Tarea[]} tareas
 * 
 */

/**
 * @typedef {Object} TareaFromProject
 * @property {Number} id_proyecto
 * @property {Number} id
 * @property {String} nombre
 * @property {String} descripcion
 * @property {'Pendiente' | 'Iniciada' | 'Terminada'} estado
 * @property {Date | null} fecha_inicio
 * @property {Date | null} fecha_fin
 * @property {Colaborador []} colaboradores
 */



/**
 * @param {'proyectos' | 'colaboradores'} from
 * @param {Number} id
 * @returns {Array<String>}
 */

function generateQueryKey(from ,id){
    return [`${from}|${id}`]
}

/**
 * @param {'proyectos' | 'colaboradores'} from
 * @param {Number} id
 * @param {'update' | 'delete' | 'create'} type
 * @returns {Array<String>}
 */
function generateMutationKey(from, id, type, label=''){
    return [`${from}|${id}|${type}|${label}`]
}

/**
 * @param {Number} id
 */
export function useTareasProyectos(id){

    const queryKey = generateQueryKey('proyectos', id)

    const {
        data: asignaciones, 
        refetch: refetchProyectos,
        isFetching: isLoadingAsignaciones
    } = useQuery({
        initialData: [],
        queryKey,
        queryFn: () => getTareasForProyecto(id,{
            colaborador: true,
            tarea: true
        })
    })

    let isLoading = isLoadingAsignaciones

    /**
     * @type {TareaFromProject[]}
     */
    const tareas = useMemo(() => {
        if (!asignaciones) return []
        const groupsTarea = asignaciones.reduce((acc, asignacion) => {
            const key = asignacion.id_tarea
            if (!acc[key]) acc[key] = []

            acc[key].push(asignacion)

            return acc
        },{})

        const tareasKeys = Object.keys(groupsTarea)

        const tareas = []

        tareasKeys.forEach(tareaId => {
            const colaboradores = []

            for (let asignacion of groupsTarea[tareaId]){
                colaboradores.push(asignacion.colaborador)
            }
    
            tareas.push({
                ...groupsTarea[tareaId][0].tarea,
                id_proyecto: groupsTarea[tareaId][0].id_proyecto,
                colaboradores
            })
        })
        isLoading = false
        isLoading |= isLoadingAsignaciones

        return tareas
    }, [asignaciones])


    /**
     * @type {ColaboradorWorkingOnProyecto []}
     */
    const colaboradores = useMemo(() => {
        const asignacionesColaboradores = {}

        for (let asignacion of asignaciones){
            if(!asignacionesColaboradores[asignacion.id_colaborador])
                asignacionesColaboradores[asignacion.id_colaborador] = []

            asignacionesColaboradores[asignacion.id_colaborador].push(asignacion)
        }

        const idsColaboradores = Object.keys(asignacionesColaboradores)
        
        // console.log(asignacionesColaboradores)

        const colaboradores = []

        for (let idColaborador of idsColaboradores){
            const colaborador = asignacionesColaboradores[idColaborador][0].colaborador
            const id_proyecto = asignacionesColaboradores[idColaborador][0].id_proyecto
            const tareas = []

            for(let asignacion of asignacionesColaboradores[idColaborador]){
                tareas.push({
                    ...asignacion.tarea,
                })
            }

            colaboradores.push({
                ...colaborador,
                id_proyecto,
                tareas
            })
            
        }

        
        isLoading = false
        isLoading |= isLoadingAsignaciones

        
        return colaboradores
        
    }, [asignaciones])


    const createTareaMutationKey = generateMutationKey('proyectos', id, 'create')
    const { mutate: createTarea } = useMutation({
        mutationFn: postTarea,
        mutationKey: createTareaMutationKey,
        onSuccess: () => {
            refetchProyectos()
        }
    })

    const deleteTareaMutationKey = generateMutationKey('proyectos', id, 'delete')
    const { mutate: deleteTarea } = useMutation({
        mutationFn: deleteTareaService,
        mutationKey: deleteTareaMutationKey,
        onSuccess: () => {
            refetchProyectos()
        }
    })

    const assignTareaToColaboradorMutationKey = generateMutationKey('proyectos', id, 'create', 'asignacion')
    const { mutate: assignTareaToColaborador } = useMutation({
        mutationFn: postAssignTareaToColaborador,
        mutationKey: assignTareaToColaboradorMutationKey,
        onSuccess: () => {
            refetchProyectos()
        }
    })

    const unassignTareaToColaboradorMutationKey = generateMutationKey('proyectos', id, 'delete', 'asignacion')
    const { mutate: unassignTareaToColaborador } = useMutation({
        mutationFn: deleteAssignmentFromColaborador,
        mutationKey: unassignTareaToColaboradorMutationKey,
        onSuccess: () => {
            refetchProyectos()
        }
    })

    const updateTareaMutationKey = generateMutationKey('proyectos', id, 'update')
    const { mutate: updateTarea } = useMutation({
        mutationFn: putTarea,
        mutationKey: updateTareaMutationKey,
        onSuccess: () => {
            refetchProyectos()
        }
    })

    
    return { tareas, colaboradores, isLoading, createTarea, deleteTarea, assignTareaToColaborador, unassignTareaToColaborador, updateTarea }
}