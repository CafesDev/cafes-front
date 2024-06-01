import { useQuery } from "@tanstack/react-query";
import { getOrganizaciones } from "../services/organizacion";

export function useOrganizations(){

    const { data: organizations, isFetching: isFetchingOrganizaciones, refetch: refreshOrganizaciones } = useQuery({
        queryKey: ['organizations'],
        initialData: [],
        queryFn: getOrganizaciones
    })

    const getOrganizationById = (id) => {
        const organizacion = organizations.find(organizacion => organizacion.id === id)
        return organizacion
    }

    return {
        organizations,
        isFetchingOrganizaciones,
        refreshOrganizaciones,
        getOrganizationById
    }
}