const { isLoggedIn, isNotLoggedIn } = require('./');

describe('isLoggedIn', () => {
    const res = {
        status : jest.fn(() => res),
        send : jest.fn(),
    };
    const next = jest.fn();

    test('로그인 되어 있으면 isLoggedIn이 next 호출', () => {
        const req = {
            isAuthenticated : jest.fn(() => true),
        }
        isLoggedIn(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);//몇번 호출되었는지 체크
    })

    test('로그인 되어 있지 않으면 isLoggedIn이 에러 응답', () => {
        const req = {
            isAuthenticated : jest.fn(() => false),
        }
        isLoggedIn(req, res, next);
        expect(res.status).toBeCalledWith(403);//특정 인수와 함께 호출되었는지 체크
        expect(res.send).toBeCalledWith('로그인 필요');
    })
})

describe('isNotoggedIn', () => {
    const res = {
        redirect : jest.fn(),
    };
    const next = jest.fn();

    test('로그인 되어있으면 isNotLoggedIn이 에러를 응답해야 함', () => {
        const req = {
          isAuthenticated: jest.fn(() => true),
        };
        isNotLoggedIn(req, res, next);
        const message = encodeURIComponent('로그인한 상태입니다')
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);//특정 인수로 호출됨을 확인
      });

    test('로그인 되어 있지 않으면 isNotLoggedIn이 next 호출', () => {
        const req = {
            isAuthenticated : jest.fn(() => false),
        }
        isNotLoggedIn(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);//호출된 횟수가 x번
    })
})