import {
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from '../actions/types';

const uniqBy = (arr, uniqueProp) => {
    const keys = {};
    return arr.filter(element => {
        if (keys[element[uniqueProp]]) return false;
        return keys[element[uniqueProp]] = true;
    });
}

export default function(state = [], action) {
    switch (action.type) {
        case LIKE_JOB:
            const newState = uniqBy([action.payload, ...state], 'jobkey');
            return newState;
        case CLEAR_LIKED_JOBS:
            return [];
        default:
            return state;
    };
}
