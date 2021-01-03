import { combineReducers } from 'redux';

import articles from './articles';
import errorView from './error';
import isLoggedIn from './is-logged-in';
import currentPage from './current-page';

const rootReducer = combineReducers({ articles, errorView, isLoggedIn, currentPage });

export default rootReducer;
