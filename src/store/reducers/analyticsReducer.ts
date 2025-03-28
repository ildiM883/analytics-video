import { AnalyticsState } from '../../types/analytics.types';
import {
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS,
  FETCH_ANALYTICS_FAILURE,
  UPDATE_ACTIVE_EVENTS,
} from '../actions/analyticsActions';

const initialState: AnalyticsState = {
  events: [],
  loading: false,
  error: null,
  activeEvents: [],
};


const analyticsReducer = (state = initialState, action: any): AnalyticsState => {
  switch (action.type) {
    case FETCH_ANALYTICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ANALYTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case FETCH_ANALYTICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ACTIVE_EVENTS:
      return {
        ...state,
        activeEvents: action.payload,
      };
    default:
      return state;
  }
};

export default analyticsReducer;