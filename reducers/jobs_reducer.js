import {
    FETCH_JOBS
} from '../actions/types';

/* not used since live data is not being returned
const INITIAL_STATE = {
    results: []
};
*/

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_JOBS:
            return action.payload;
        default:
            return state;
    };
}
