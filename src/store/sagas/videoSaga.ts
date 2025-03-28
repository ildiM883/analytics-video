import { takeEvery, put, select } from 'redux-saga/effects';

import { RootState } from '../store';
import { updateActiveEvents } from '../actions/analyticsActions';
import { UPDATE_VIDEO_TIME } from '../actions/videoActions';

function* updateActiveEventsSaga() {
  const state: RootState = yield select();
  const { currentTime } = state.video;
  const { events } = state.analytics;

  const activeEvents = events
    .filter(event => {
      const start = event.timestamp;
      const end = start + event.duration;
      return currentTime >= start && currentTime <= end;
    })
    .map((event, index) => ({
      ...event,
      id: `${event.timestamp}-${index}`,
    }));

  yield put(updateActiveEvents(activeEvents));
}

export function* watchVideoTime() {
  yield takeEvery(UPDATE_VIDEO_TIME, updateActiveEventsSaga);
}