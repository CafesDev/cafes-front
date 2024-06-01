import { appGetRequest } from "../../services/appRequest";

export function getOrganizaciones(){
    const request = appGetRequest('/api/organizaciones')

    return (
        fetch(request)
        .then((response) => {
            // console.log(response)
            return response.json()
        })

    )
}