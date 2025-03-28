import { all } from 'redux-saga/effects';
import { watchFetchAnalytics } from './analyticsSaga';
import { watchVideoTime } from './videoSaga';

export default function* rootSaga() {
  yield all([
    watchFetchAnalytics(),
    watchVideoTime(),
  ]);
}