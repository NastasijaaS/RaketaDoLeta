
const UserReducer = (state, action) => {
    switch (action.tip) {
        case "LOGIN_START":
            return {
                user: null,
                ucitavaSe: true,
                greska: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                ucitavaSe: false,
                greska: false,
            };
        case "LOGIN_FAIL":
            return {
                user: null,
                ucitavaSe: false,
                greska: true,
            };
        case "ODJAVI":
            return {
                user: null,
                ucitavaSe: false,
                greska: false,
            };

        default:
            return state;
    }
};

export default UserReducer
