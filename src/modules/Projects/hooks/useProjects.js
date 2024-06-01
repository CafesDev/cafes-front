import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProyecto as deleteProyectoService, getProyectos, postProyecto, putProyecto } from "../services/proyectos";


export const getProyectosKey = ['projects']

export function useProjects(){

    const queryClient = useQueryClient()
   
    const {data: projects, isLoading: isLoadingFetching, error: errorFetching, refetch: refreshProjects} = useQuery({
        queryKey: getProyectosKey,
        queryFn: getProyectos
    })

    const { mutate: createProject, isPending: isLoadingCreation } = useMutation({
        mutationFn: postProyecto,
        onSuccess: async (newProject) => {
            console.log(newProject)
            await refreshProjects()

        }})

    const { mutate: updateProject} = useMutation({
        mutationFn: putProyecto,
        onSuccess: () => {
            refreshProjects()
        }
    })

    const {mutate: deleteProject} = useMutation({
        mutationFn: deleteProyectoService,
        onSuccess: () => {
            refreshProjects()
        }
    })

    return {
        projects,
        isLoadingFetching,
        errorFetching,
        createProject,
        isLoadingCreation,
        updateProject,
        deleteProject
    }
}
