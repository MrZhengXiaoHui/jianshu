import axios from 'axios';
import * as constants from './constants';

const changeLogin = () => ({
    type: constants.CHANGE_LOGIN,
    value: true
});

export const logout=()=>({
    type: constants.LOGOUT,
    value: false
});

export const login = (accout, password) => {
    return dispatch => {
        axios
            .get('/api/login.json', {
                params: {
                    accout,
                    password
                }
            })
            .then(res => {
                if (res.data.data) {
                    dispatch(changeLogin())
                } else {
                    alert('登陆失败');
                }
            });
    };
};
