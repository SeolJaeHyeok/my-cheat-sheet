type ApiResponse<T> = {
    success: boolean;
    data: T | null;
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
            if (requestSuccessProbablity >= 10) {
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

export const singleRequest = async <T>(url: string) => {
    try {
        const result = await mockApiRequest<T>({
            url,
        });

        return result;
    } catch (e: unknown) {
        throw e;
    }
};

export const multipleRequest = async <T>({
    urls,
    maxConcurrency = 3, // 동시에 실행할 작업의 수
    delayPerRequest = 300,
}: {
    urls: string[];
    maxConcurrency?: number;
    delayPerRequest?: number;
}): Promise<ApiResponse<T>[]> => {
    const results: ApiResponse<T>[] = [];
    let index = 0;

    const worker = async () => {
        while (index < urls.length) {
            const currentIndex = index++;
            const url = urls[currentIndex];
            try {
                const response = await mockApiRequest<T>({ url, delayPerRequest });
                results[currentIndex] = response;
            } catch (error) {
                results[currentIndex] = {
                    success: false,
                    data: null,
                    error: `Failed Api Request from ${url}`,
                };
            }
        }
    };

    const workers = Array.from({ length: maxConcurrency }, () => worker());

    await Promise.all(workers);

    return results;
};
