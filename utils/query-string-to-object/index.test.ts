import { queryStringToObject } from '.';

describe('queryStringToObject function', () => {
    test('모든 프로퍼티를 객체로 변환한다.', () => {
        const value = 'a=1&b=milkboy&c=helloworld&d=안녕&e=typescript';

        expect(queryStringToObject(value)).toStrictEqual({
            a: '1',
            b: 'milkboy',
            c: 'helloworld',
            d: '안녕',
            e: 'typescript',
        });
    });

    test('값이 없는 프로퍼티의 경우 변환하지 않는다.', () => {
        const value = 'a=1&b=&c=helloworld&d=안녕&e=';

        expect(queryStringToObject(value)).toStrictEqual({
            a: '1',
            c: 'helloworld',
            d: '안녕',
        });
    });
});
