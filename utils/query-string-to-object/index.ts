import { isArray } from '../is-array';

/**
 * @description 쿼리 스트링을 객체로 변환하는 함수
 *
 * @param {string} params - 쿼리 스트링 문자열
 * @return {object | string} key-value 형태로 변환된 객체
 *
 */
export const queryStringToObject = (str: string): Record<string, any> | string => {
    const queryStr = str.substring(str.indexOf('?') + 1);
    const re = /([^&=]+)=?([^&]*)/g; // query 안의 key-value 추출
    const decodeRE = /\+/g;

    let params = {} as Record<string, any>;
    let e: RegExpExecArray | null = null;

    const decode = (str: string): string => {
        return decodeURIComponent(str.replace(decodeRE, ' '));
    };

    const assign = (obj: Record<string, any>, keyPath: any[], value: any): void => {
        const lastKeyIndex = keyPath.length - 1;
        for (let i = 0; i < lastKeyIndex; ++i) {
            const key = keyPath[i];
            if (!(key in obj)) obj[key] = {};
            obj = obj[key];
        }
        obj[keyPath[lastKeyIndex]] = value;
    };

    while ((e = re.exec(queryStr))) {
        let k = decode(e[1]);
        const v = decode(e[2]);
        if (k.substring(k.length - 2) === '[]') {
            k = k.substring(0, k.length - 2);
            (params[k] || (params[k] = [])).push(v);
        } else if (params[k]) {
            const prevParams = isArray(params[k]) ? params[k] : [params[k]];
            prevParams.push(v);
            params[k] = prevParams;
        } else {
            // falsy value validation
            if (!v) continue;
            params[k] = v;
        }
    }

    for (const prop in params) {
        const structure = prop.split('[');
        if (structure.length > 1) {
            const levels = [] as any[];
            structure.forEach((item) => {
                const key = item.replace(/[?[\]\\ ]/g, '');
                levels.push(key);
            });
            assign(params, levels, params[prop]);
            delete params[prop];
        }
    }

    return str ? params : '';
};
