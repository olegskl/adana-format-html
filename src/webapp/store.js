/* global window */

import {createStore} from 'redux';
import parseUrl from './services/parse-url';
import buildTree from './services/build-tree';
import {locationAction} from './actions/location-action';
import reportReducer from './reducers/report-reducer';

const {files, timestamp, thresholds, environment} = '%REPORT%';
const store = createStore(reportReducer, {
  location: parseUrl(window.location.href),
  files: buildTree(files),
  environment,
  thresholds,
  timestamp
});

window.addEventListener('hashchange', ({newURL}) => {
  store.dispatch(locationAction(parseUrl(newURL)));
});

export default store;
