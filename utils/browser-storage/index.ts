/**
 * 싱글톤으로 동작하는 브라우저 스토리지를 관리하는 클래스
 */

type TStorage = 'localStorage' | 'sessionStorage';

interface IInstance {
    [key: string]: BrowserStorageManager;
}

export class BrowserStorageManager {
    private static instances: IInstance = {};
    private storage: Storage;

    private constructor(storageType: TStorage) {
        this.storage = window[storageType];
    }

    static getInstance(storageType: TStorage): BrowserStorageManager {
        if (!BrowserStorageManager.instances[storageType]) {
            BrowserStorageManager.instances[storageType] = new BrowserStorageManager(storageType);
        }
        return BrowserStorageManager.instances[storageType];
    }

    set<T>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    get<T>(key: string): T {
        const item = this.storage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    remove(key: string): void {
        this.storage.removeItem(key);
    }

    clear(): void {
        this.storage.clear();
    }
}
