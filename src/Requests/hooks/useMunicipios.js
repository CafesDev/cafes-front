import { useQuery } from "@tanstack/react-query"
import { getMunicipios } from "../services/municipios"

export function useMunicipios(){
    
    const { data: municipios, isFetching: isFetchingMunicipios, refetch: refreshMunicipios } = useQuery({
        queryKey: ['municipios'],
        queryFn: getMunicipios,
    })
    
    return {
        municipios,
        isFetchingMunicipios,
        refreshMunicipios
    }
}