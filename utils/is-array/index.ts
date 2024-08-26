export const isArray = <T>(array: T | T[]): array is T[] => {
    return Array.isArray(array);
};
