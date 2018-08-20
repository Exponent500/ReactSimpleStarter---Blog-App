import { FETCH_POSTS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_POSTS:
            // Uses the mapKeys lodash method to convert an array of objects (in this case action.payload.data)
            // into an object of objects, who's keys match the value of the property provided as the second argument (in this case 'id')
            // and who's values match the objects within the original array of objects (action.payload.data)
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}