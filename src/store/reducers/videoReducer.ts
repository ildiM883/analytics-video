import { VideoState, PlayVideoAction, PauseVideoAction, SeekVideoAction, UpdateVideoTimeAction, SetVideoDurationAction } from '../../types/video.types';
import {
  PLAY_VIDEO,
  PAUSE_VIDEO,
  SEEK_VIDEO,
  UPDATE_VIDEO_TIME,
  SET_VIDEO_DURATION,
} from '../actions/videoActions';

const initialState: VideoState = {
  currentTime: 0,
  isPlaying: false,
  videoDuration: 0,
};

type VideoAction =
  | PlayVideoAction
  | PauseVideoAction
  | SeekVideoAction
  | UpdateVideoTimeAction
  | SetVideoDurationAction;

const videoReducer = (state = initialState, action: VideoAction): VideoState => {
  switch (action.type) {
    case PLAY_VIDEO:
      return {
        ...state,
        isPlaying: true,
      };
    case PAUSE_VIDEO:
      return {
        ...state,
        isPlaying: false,
      };
    case SEEK_VIDEO:
      return {
        ...state,
        currentTime: action.payload,
      };
    case UPDATE_VIDEO_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };
    case SET_VIDEO_DURATION:
      return {
        ...state,
        videoDuration: action.payload,
      };
    default:
      return state;
  }
};

export default videoReducer;