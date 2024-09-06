/**
 * @description 에러 객체를 throw 할 때 에러 객체만 넘기는게 아닌 에러 객체 안에 커스텀 데이터를 담아서 넘길 수 있게 만들어주는 Custom Error Class
 */

interface CustomErrorOptions<T> {
    details?: T;
}

export default class CustomError<T> extends Error {
    details?: T;

    constructor(message: string, options?: CustomErrorOptions<T>) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);

        if (options && options.details) {
            this.details = options.details as T;
        }
    }
}
