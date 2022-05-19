export const LoginStart = () => ({
    tip: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    tip: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () => ({
    tip: "LOGIN_FAIL",
});

