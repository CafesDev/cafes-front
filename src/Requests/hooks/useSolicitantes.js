import { getAllSolicitantes, postSolicitante } from "../services/solicitantes"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"


function useSolicitantes(){

    
    const queryClient = useQueryClient()

    const { data: solicitantes, refetch: refreshSolicitantes } = useQuery({
        queryKey: ['solicitantes'],
        queryFn: getAllSolicitantes,
        initialData: []

    })

    const { mutate: createSolicitante } = useMutation({
        queryKey: ['post-solicitante'],
        mutationFn: postSolicitante,
        onMutate: async (solicitanteToPost) => {
            await queryClient.cancelQueries(['solicitantes'])

            const previusSolicitantes = queryClient.getQueryData(['solicitantes'])

            await queryClient.setQueryData(['solicitantes'], (oldSolicitantes) => {
                if (!oldSolicitantes) return [solicitanteToPost]

                return [...oldSolicitantes, solicitanteToPost]
            })

            return { previusSolicitantes }
        },
        onError: (error, variables, context) => {
            console.error(error)

            if(context.previusSolicitantes != null)
                queryClient.setQueryData(['solicitantes'], context.previusSolicitantes)
        },
        onSettled: () => {
            refreshSolicitantes()
        }
    })
        

    return {solicitantes, refreshSolicitantes, createSolicitante}
}

export default useSolicitantes