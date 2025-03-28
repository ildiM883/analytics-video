import { AnalyticsEvent, ActiveEvent } from "../../types/analytics.types";

export const FETCH_ANALYTICS_REQUEST = 'FETCH_ANALYTICS_REQUEST';
export const FETCH_ANALYTICS_SUCCESS = 'FETCH_ANALYTICS_SUCCESS';
export const FETCH_ANALYTICS_FAILURE = 'FETCH_ANALYTICS_FAILURE';
export const UPDATE_ACTIVE_EVENTS = 'UPDATE_ACTIVE_EVENTS';

export const fetchAnalyticsRequest = () => ({
  type: FETCH_ANALYTICS_REQUEST,
});

export const fetchAnalyticsSuccess = (events: AnalyticsEvent[]) => ({
  type: FETCH_ANALYTICS_SUCCESS,
  payload: events,
});

export const fetchAnalyticsFailure = (error: string) => ({
  type: FETCH_ANALYTICS_FAILURE,
  payload: error,
});

export const updateActiveEvents = (activeEvents: ActiveEvent[]) => ({
  type: UPDATE_ACTIVE_EVENTS,
  payload: activeEvents,
});