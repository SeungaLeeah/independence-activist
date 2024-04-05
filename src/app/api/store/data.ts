import { getHonorData } from '../remote/data';

export async function fetchHonorData(params: URLSearchParams) {
    console.log(params,'params')
    const url = params.toString();
    const data = await getHonorData(url);
    return data;
}