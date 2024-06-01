import { useMemo } from "react"
import { getColaboradores, postColaborador, putColaborador } from "../services/colaboradores"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTiposColaborador } from "../services/tiposColaborador"
import { getLicenciaturas, postLicenciatura } from "../services/licenciaturas"




export function useCollaborators(){


    const queryClient = useQueryClient()

    const { data: collaborators, refetch: refreshCollaborators } = useQuery({
        initialData: [],
        queryKey: ['collaborators'],
        queryFn: getColaboradores,
    })

    const { data: tiposColaborador } = useQuery({
        initialData: [],
        queryKey: ['type-collaborators'],
        queryFn: getTiposColaborador
    }) 

    const {data: licenciaturas, refetch: refreshLicenciaturas} = useQuery({
        initialData: [],
        queryKey: ['licenciaturas'],
        queryFn: getLicenciaturas
    })


    const { mutate: createCollaborator } = useMutation({
        mutationKey: ['post-collaborator'],
        mutationFn: postColaborador,
        onMutate: async (collaboratorToPost) => {
            await queryClient.cancelQueries(['collaborators'])

            const previousCollaborators = queryClient.getQueryData(['collaborators'])

            await queryClient.setQueryData(['collaborators', (oldCollaborators) => {
                if (!oldCollaborators) return [collaboratorToPost]

                return [...oldCollaborators, collaboratorToPost]

            }])

            return { previousCollaborators }
        },
        onError: (error, variables, context) => {
            console.error(error)
            
            if(context.previousCollaborators)
                queryClient.setQueryData(['collaborators'], context)
        },
        onSettled: () => {
            refreshCollaborators()
        },
        onSuccess: () => {
        }
    })

    const getCollaboratorById = (id) => {
        const collaborator = collaborators.find(colaborator => colaborator.matricula === id)
        return collaborator
    }

    const {mutate: updateCollaborator} = useMutation({
        mutationFn: putColaborador,
        mutationKey: ['updateCollaborator'],
        onSuccess: () => {
            refreshCollaborators()
        }
    })

    const activeCollaborators = useMemo(() => {
        return collaborators.filter((collaborator) => collaborator.estado === 'Activo');
    }, [collaborators])

    const inactiveCollaborators = useMemo(() => {
        return collaborators.filter((collaborator) => collaborator.estado === 'Inactivo');
    }, [collaborators])

    const createLicenciatura = useMutation({
        mutationFn: postLicenciatura,
        mutationKey: ['createLicenciatura'],
        onSuccess: () => {
            refreshLicenciaturas()
        }
    })

    return {
        collaborators, 
        refreshCollaborators, 
        createCollaborator, 
        getCollaboratorById, 
        updateCollaborator, 
        activeCollaborators, 
        inactiveCollaborators,
        tiposColaborador,
        licenciaturas,
        createLicenciatura
    }
}

export default useCollaborators