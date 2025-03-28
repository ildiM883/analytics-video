import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_ANALYTICS_REQUEST,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
} from '../actions/analyticsActions';
import dataAnalytics from '../../assets/data.json'
import { AnalyticsEvent } from '../../types/analytics.types';

async function fetchAnalyticsData(): Promise<AnalyticsEvent[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!Array.isArray(dataAnalytics)) {
      throw new Error('Недопустимый формат данных: ожидался массив');
    }

    return dataAnalytics as AnalyticsEvent[];
  } catch (error) {
    console.error('Ошибка загрузки локальных данных:', error);
    throw new Error('Не удалось загрузить локальные данные аналитики');
  }
}

function* fetchAnalyticsSaga(): Generator<any, void, AnalyticsEvent[]> {
  try {
    const data: AnalyticsEvent[] = yield call(fetchAnalyticsData);
    yield put(fetchAnalyticsSuccess(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchAnalyticsFailure(error.message));
    } else {
      yield put(fetchAnalyticsFailure('Произошла неизвестная ошибка'));
    }
  }
}

export function* watchFetchAnalytics(): Generator<any, void, any> {
  yield takeEvery(FETCH_ANALYTICS_REQUEST as any, fetchAnalyticsSaga);
}
