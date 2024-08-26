/**
 * 객체 안의 Falsy 값이 아닌 프로퍼티를 쿼리 스트링으로 변환하는 함수
 *
 * @param {Object | Array} params - 객체 혹은 배열
 * @param {string} prefix - 접두사
 * @return {string} 쿼리 스트링으로 변환된 문자열
 *
 * @example
 *
 *     const obj = {a: 1, b: 2, c: 3}
 *     objToQStr(obj) // a=1&b=2&c=3
 *
 */

export const objectToQueryString = (params: Record<string, any>, prefix?: string): string => {
    const query = Object.keys(params).reduce((acc: string[], key) => {
        const value = params[key];

        if (!Boolean(value)) {
            return acc;
        }

        let formattedKey;

        if (params.constructor === Array) {
            formattedKey = `${prefix}`;
        } else if (params.constructor === Object) {
            formattedKey = prefix ? `${prefix}[${key}]` : key;
        }

        if (typeof value === 'object') {
            acc.push(objectToQueryString(value, formattedKey));
        } else {
            acc.push(`${formattedKey}=${encodeURIComponent(value)}`);
        }

        return acc;
    }, []);

    return query.join('&');
};
