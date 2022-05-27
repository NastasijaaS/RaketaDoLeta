export const LoginStart = () => ({
    tip: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    tip: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    tip: "LOGIN_FAIL",
    error: error
});

