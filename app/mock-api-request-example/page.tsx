'use client';

import { singleRequest } from '@/utils/mockPromise';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        (async () => {
            try {
                const data = await singleRequest();
                console.log('success data', data);
            } catch (e: unknown) {
                console.log('catch rejected Error', e);
            }
        })();
    }, []);

    return <div>Mock API Request Example</div>;
}
