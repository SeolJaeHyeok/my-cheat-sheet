import { BrowserStorageManager } from '.';

describe('Broswer Storage class', () => {
    it('같은 storage라면 싱글톤 인스턴스로 동작한다.', () => {
        const original = BrowserStorageManager.getInstance('localStorage');
        const another = BrowserStorageManager.getInstance('localStorage');

        expect(original === another).toStrictEqual(true);
    });

    it('local storage와 session storage의 인스턴스가 서로 다르다.', () => {
        const localStorageManager = BrowserStorageManager.getInstance('localStorage');
        const sessionStorageManager = BrowserStorageManager.getInstance('sessionStorage');

        expect(localStorageManager !== sessionStorageManager).toStrictEqual(true);
    });

    it('local storage에 올바른 값을 설정하고 가져온다.', () => {
        const value = 'Hello';
        const localStorageManager = BrowserStorageManager.getInstance('localStorage');

        localStorageManager.set('key', 'Hello');

        const testValue = localStorageManager.get('key');

        expect(value === testValue).toBe(true);
    });

    it('session storage에 올바른 값을 설정하고 가져온다.', () => {
        const value = 'Hello';
        const sessionStorageManager = BrowserStorageManager.getInstance('localStorage');

        sessionStorageManager.set('key', 'Hello');

        const testValue = sessionStorageManager.get('key');

        expect(value === testValue).toBe(true);
    });
});
