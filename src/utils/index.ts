import * as axios from "axios"

export async function apiFetcher(): Promise<unknown>{
    const url = 'https://dinoparks.herokuapp.com/nudls/feed'
    const response = await axios.get(url)
    return response.data
}