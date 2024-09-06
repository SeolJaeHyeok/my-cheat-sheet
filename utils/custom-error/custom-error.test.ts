import CustomError from '.';

describe('Custom Error Class', () => {
    it('에러 객체를 throw 한 경우, catch에서 수신하는 error.message의 타입이 string 타입이다.', () => {
        try {
            throw new Error('milkboy');
        } catch (error: any) {
            expect(error.message).toEqual('milkboy');
        }
    });

    it('커스텀 에러 객체를 throw 한 경우, catch에서 details 안에 custom을 가져온다.', () => {
        try {
            throw new CustomError<{ custom: string }>('milkboy', {
                details: { custom: '2564' },
            });
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                expect(error.details?.custom).toEqual('2564');
            }
        }
    });

    it('커스텀 에러 객체를 throw 한 경우, catch에서 커스텀 객체 안의 타이틀을 가져온다.', () => {
        try {
            throw new CustomError<{ custom: string }>('Hello', {
                details: { custom: '2564' },
            });
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual('Hello');
            }
        }
    });

    it('커스텀 에러 객체를 throw 할 때, details를 넘기지 않아도 된다.', () => {
        try {
            throw new CustomError('Hello');
        } catch (error: unknown) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual('Hello');
            }
        }
    });
});
