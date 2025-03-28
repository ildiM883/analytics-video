import { FETCH_ANALYTICS_REQUEST, FETCH_ANALYTICS_SUCCESS, FETCH_ANALYTICS_FAILURE, UPDATE_ACTIVE_EVENTS } from "../store/actions/analyticsActions";


export type FetchAnalyticsRequestAction = {
  type: typeof FETCH_ANALYTICS_REQUEST;
};

export type FetchAnalyticsSuccessAction = {
  type: typeof FETCH_ANALYTICS_SUCCESS;
  payload: AnalyticsEvent[];
};

export type FetchAnalyticsFailureAction = {
  type: typeof FETCH_ANALYTICS_FAILURE;
  payload: string;
};

export type UpdateActiveEventsAction = {
  type: typeof UPDATE_ACTIVE_EVENTS;
  payload: ActiveEvent[];
};

export type AnalyticsAction =
  | FetchAnalyticsRequestAction
  | FetchAnalyticsSuccessAction
  | FetchAnalyticsFailureAction
  | UpdateActiveEventsAction;

export interface Zone {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface AnalyticsEvent {
  timestamp: number;
  duration: number;
  zone: Zone;
}

export interface ActiveEvent extends AnalyticsEvent {
  id: string;
}

export interface AnalyticsState {
  events: AnalyticsEvent[];
  loading: boolean;
  error: string | null;
  activeEvents: ActiveEvent[];
}