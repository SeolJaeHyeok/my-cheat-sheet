type ApiResponse<T> = {
    success: boolean;
    data: T;
    error?: string;
};

const mockApiRequest = ({
    url,
    delayPerRequest = 300,
}: {
    url: string | string[];
    delayPerRequest: number;
}) => {
    return new Promise((resolve) => {
        const requestSuccessProbablity = Math.floor(Math.random() * 100); // 0 ~ 99
        setTimeout(() => {
            // API 실패 확률 10%
            if (requestSuccessProbablity < 10) {
                resolve({
                    success: true,
                    data: `Success Api Request from ${url}`,
                    error: null,
                });
            } else {
                resolve({
                    success: false,
                    data: `Failed Api Request from ${url}`,
                    error: null,
                });
            }
        }, delayPerRequest);
    });
};
