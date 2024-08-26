import { objectToQueryString } from '.';

describe('objectToQueryString function', () => {
    test('모든 Property를 올바르게 변환한다.', () => {
        const value = { a: 1, b: 6, c: 'milkboy', d: 'hovelopin', e: 'kimddaki' };
        const answer = 'a=1&b=6&c=milkboy&d=hovelopin&e=kimddaki';
        expect(objectToQueryString(value)).toBe(answer);
    });

    test('모든 Property를 올바르게 변환한다.', () => {
        const value = [1, 2, 3, 4, 5];
        const answer = 'key=1&key=2&key=3&key=4&key=5';
        expect(objectToQueryString(value, 'key')).toBe(answer);
    });

    test('Falsy Value인 경우 해당 값은 변환하지 않는다', () => {
        const value = { a: '', b: 6, c: '', d: 'hovelopin', e: 'kimddaki' };
        const answer = 'b=6&d=hovelopin&e=kimddaki';

        expect(objectToQueryString(value)).toBe(answer);
    });

    test('Falsy Value인 경우 해당 값은 변환하지 않는다', () => {
        const value = { a: null, b: '', c: undefined, d: 'hovelopin', e: 'kimddaki' };
        const answer = 'd=hovelopin&e=kimddaki';

        expect(objectToQueryString(value)).toBe(answer);
    });
});
