import { getAllSolicitudes, acceptRejectSolicitud, postSolicitud } from "../services/solicitudes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTiposServicio } from "../services/tiposServicio";
import { useMemo } from "react";


export const getOrganizacionesKey = ['organizations']
export const getTiposServicioKey = ['serviceTypes']

export function useSolicitudes(){


    const queryClient = useQueryClient()


    const { data: solicitudes, refetch: refreshSolicitudes } = useQuery({
        initialData: [],
        queryKey: ['solicitudes'],
        queryFn: getAllSolicitudes
    })

    const { mutate: acceptOrRejectSolicitud } = useMutation({
        mutationKey: ['accept-reject-solicitud'],
        mutationFn: acceptRejectSolicitud,
        onMutate: async (solicitudToChange) => {
            await queryClient.cancelQueries(['solicitudes'])

            const previusSolicitudes = queryClient.getQueryData(['solicitudes'])

            await queryClient.setQueryData(['solicitudes'], (oldSolicitudes) => {
                if (!oldSolicitudes) return []

                const newStateSolicitudes = [...oldSolicitudes]
                newStateSolicitudes.find(solicitud => solicitud.id == solicitudToChange.idSolicitud).estado

                return newStateSolicitudes

            })

            return { previusSolicitudes }
        },
        onError: (error, variables, context) => {
            console.error(error)

            if(context.previusSolicitudes != null)
                queryClient.setQueryData(['solicitudes'], context.previusSolicitudes)

        },
        onSettled: () => {
            refreshSolicitudes()
        },
        onSuccess: () => {
            refreshSolicitudes()
            
        }
    })

    const { mutate: createSolicitude } = useMutation({
        mutationKey: ['create-solicitud'],
        mutationFn: postSolicitud,
        onSuccess: () => {
            refreshSolicitudes()
        }
    })
    
    const getRequestById = (id) => {
        const solicitud = solicitudes.find(solicitud => solicitud.id === id)
        return solicitud
    }



    const getMunicipioById = (id) => {
        const municipio = municipios.find(municipio => municipio.id === id)
        return municipio
    }

    const getTipoServicioById = (id) => {
        const tipoServicio = tiposServicio.find(tipoServicio => tipoServicio.clave === id);
        return tipoServicio;
    }

    const {data: tiposServicio} = useQuery({
        queryKey: getTiposServicioKey,
        queryFn: getTiposServicio,
        initialData: []
    })

    const acceptedSolicitudes = useMemo(() => {
        return solicitudes.filter(solicitud => solicitud.estado === 'Aceptada')
    }, [solicitudes])

    const rejectedSolicitudes = useMemo(() => {
        return solicitudes.filter(solicitud => solicitud.estado === 'Rechazada')
    }, [solicitudes])

    return {
            solicitudes, 
            refreshSolicitudes, 
            acceptOrRejectSolicitud, 
            createSolicitude,
            tiposServicio,
            getRequestById,
            getMunicipioById,
            getTipoServicioById,
            acceptedSolicitudes,
            rejectedSolicitudes
    }
}

export default useSolicitudes