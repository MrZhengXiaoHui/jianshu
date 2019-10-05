import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const changeHomeDate = result => ({
    type: constants.CHANGE_HOME_DATA,
    articleList: result.articleList,
    recommendList: result.recommendList
});

const addHomeList = (list,nextPage) => ({
    type: constants.ADD_ARTICLE_LIST,
    list: fromJS(list),
    nextPage
});

export const getHomeInfo = () => {
    return dispatch => {
        axios.get('/api/home.json').then(res => {
            const action = changeHomeDate(res.data.data);
            dispatch(action);
        });
    };
};

export const getMoreList = page => {
    return dispatch => {
        axios
            .get('/api/homeList.json', {
                params: {
                    page
                }
            })
            .then(res => {
                const action = addHomeList(res.data.data, page + 1);
                dispatch(action);
            });
    };
};

export const toggleTopShow=show=>({
    type: constants.TOGGLE_SCROLL_TOP,
    show
})
