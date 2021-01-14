import { combineReducers } from 'redux';

import articles from './articles';
import errorView from './error';
import isLoggedIn from './is-logged-in';
import currentPage from './current-page';
import currentUser from './current-user';

const rootReducer = combineReducers({ articles, errorView, isLoggedIn, currentPage, currentUser });

export default rootReducer;
