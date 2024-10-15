type ApiResponse<T> = {
    success: boolean;
    data: T;
    error?: string | null;
};

const mockApiRequest = <T>({
    url,
    delayPerRequest = 300,
}: {
    url: string | string[];
    delayPerRequest?: number;
}): Promise<ApiResponse<T>> => {
    return new Promise((resolve, reject) => {
        const requestSuccessProbablity = Math.floor(Math.random() * 100); // 0 ~ 99
        setTimeout(() => {
            // API 실패 확률 10%
            if (requestSuccessProbablity < 10) {
                resolve({
                    success: true,
                    data: `Success Api Request from ${url}`,
                    error: null,
                } as ApiResponse<T>);
            } else {
                reject({
                    success: false,
                    data: `Failed Api Request from ${url}`,
                    error: null,
                } as ApiResponse<T>);
            }
        }, delayPerRequest);
    });
};

export const singleRequest = async () => {
    try {
        const result = await mockApiRequest<{ data: string[] }>({
            url: 'http://localhost:4000/api',
        });

        return result;
    } catch (e: unknown) {
        throw e;
    }
};
