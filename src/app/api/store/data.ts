import { getHonorData } from '../remote/data';

export async function fetchHonorData(params: URLSearchParams) {
    const url = params.toString();
    const data = await getHonorData(url);
    return data;
}