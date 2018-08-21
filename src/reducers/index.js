import { combineReducers } from 'redux';
// Redux Form library recommends we alias reducer as formReducer.
// This is because reducer is too casual a keyword, and also
// we want to avoid conflicting with any other libraries that also have
// a reducer object in their libraries
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer // critical we assign formReducer to key "form", as all our forms we hook up in our components are going to assume the formReducer is assigned to the "form" key.
});

export default rootReducer;
