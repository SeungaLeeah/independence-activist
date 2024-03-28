const BASE_URL = 'https://e-gonghun.mpva.go.kr/opnAPI/publicReportList.do?type=JSON';

export const getHonorData = async (path: string) => {
    try {
        const response = await fetch(`${BASE_URL}&${path}`);
        if (!response.ok) {
            throw new Error('데이터를 가져오는 중에 오류가 발생했습니다.');
        }
        return response.json();
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        throw error;
    }
};