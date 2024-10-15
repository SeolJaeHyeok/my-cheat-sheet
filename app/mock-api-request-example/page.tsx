'use client';

import { multipleRequest, singleRequest } from '@/utils/mockPromise';
import { useEffect } from 'react';

export default function Home() {
    const singleRequestMock = async () => {
        try {
            const data = await singleRequest('http://localhost:4000/api');
            console.log('success data', data);
        } catch (e: unknown) {
            console.log('catch rejected Error', e);
        }
    };

    const multipleRequestMock = async () => {
        try {
            const data = await multipleRequest({
                urls: [
                    'http://localhost:4000/api/1',
                    'http://localhost:4000/api/2',
                    'http://localhost:4000/api/3',
                    'http://localhost:4000/api/4',
                    'http://localhost:4000/api/5',
                    'http://localhost:4000/api/6',
                    'http://localhost:4000/api/7',
                    'http://localhost:4000/api/8',
                ],
                maxConcurrency: 4,
                delayPerRequest: 1000,
            });
            console.log('data', data);
        } catch (e: unknown) {
            console.log('e', e);
        }
    };

    useEffect(() => {
        singleRequestMock();
        multipleRequestMock();
    }, []);

    return <div>Mock API Request Example</div>;
}
