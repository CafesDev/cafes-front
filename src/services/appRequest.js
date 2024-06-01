import { TOKEN_KEY, BACKEND_URL } from "../constants"

const token = sessionStorage.getItem(TOKEN_KEY)

export function appGetRequest(urlString, params){

    const url = new URL(urlString, BACKEND_URL)

    if (params) url.searchParams = params

    const request = new Request(url)
    request.headers.append('Content-Type', `application/json`)
    request.headers.append('Authorization', `Bearer ${token}`)

    // console.log(url);
    // console.log(request);
    // console.log([...request.headers.values()]);
    
    return request    
}   

export function appPostRequest(urlString, params, body){

    const url = new URL(urlString, BACKEND_URL)
    const headers = new Headers()
    headers.append('Content-Type', `application/json`)
    headers.append('Authorization', `Bearer ${token}`)

    if (params) url.searchParams = params

    console.log(body)
    
    const request = new Request(url,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body) 
    })
    
    console.log(request)

    return request
}

export function appPutRequest(urlString, params, body){

    const url = new URL(urlString, BACKEND_URL)
    const headers = new Headers()
    headers.append('Content-Type', `application/json`)
    headers.append('Authorization', `Bearer ${token}`)

    if (params) url.searchParams = params

    console.log(body)
    
    const request = new Request(url,{
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body) 
    })
    
    console.log(request)

    return request
}

export function appDeleteRequest(urlString, params, body){
    const url = new URL(urlString, BACKEND_URL)
    const headers = new Headers()
    headers.append('Content-Type', `application/json`)
    if (params) url.searchParams = params

    console.log(body)
    const request = new Request(url,{
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(body) 
    })
    
    console.log(request)

    return request
}

