/**
 * @description 배열인지 확인하는 함수
 * @param arr
 * @returns {boolean}
 * @description 이 함수는 1개의 매개변수를 받고 boolean 값을 반환한다.
 */
export const isArray = <T>(array: T | T[]): array is T[] => {
    return Array.isArray(array);
};
