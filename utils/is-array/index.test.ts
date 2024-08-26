import { isArray } from '.';

describe('isArray function', () => {
    test('숫자 배열은 true를 반환한다.', () => {
        const value = [1, 2, 3];
        expect(isArray(value)).toBe(true);
    });

    test('빈 배열은 true를 반환한다.', () => {
        const value: number[] = [];
        expect(isArray(value)).toBe(true);
    });

    test('문자열은 false를 반환한다.', () => {
        const value = 'Hello, world!';
        expect(isArray(value)).toBe(false);
    });

    test('객체는 false를 반환한다.', () => {
        const value = { key: 'value' };
        expect(isArray(value)).toBe(false);
    });

    test('숫자는 false를 반환한다.', () => {
        const value = 42;
        expect(isArray(value)).toBe(false);
    });

    test('문자열 배열은 true를 반환한다.', () => {
        const value = ['a', 'b', 'c'];
        expect(isArray(value)).toBe(true);
    });

    test('null은 false를 반환한다.', () => {
        const value = null;
        expect(isArray(value)).toBe(false);
    });

    test('undefined는 false를 반환한다.', () => {
        const value = undefined;
        expect(isArray(value)).toBe(false);
    });

    test('여러 타입이 들어간 배열은 true를 반환한다.', () => {
        const value = [1, 'a', true];
        expect(isArray(value)).toBe(true);
    });
});
