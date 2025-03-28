import { PAUSE_VIDEO, PLAY_VIDEO, SEEK_VIDEO, SET_VIDEO_DURATION, UPDATE_VIDEO_TIME } from "../store/actions/videoActions";

export interface VideoState {
  currentTime: number;
  isPlaying: boolean;
  videoDuration: number;
}


export type PlayVideoAction = {
  type: typeof PLAY_VIDEO;
};

export type PauseVideoAction = {
  type: typeof PAUSE_VIDEO;
};

export type SeekVideoAction = {
  type: typeof SEEK_VIDEO;
  payload: number;
};

export type UpdateVideoTimeAction = {
  type: typeof UPDATE_VIDEO_TIME;
  payload: number;
};

export type SetVideoDurationAction = {
  type: typeof SET_VIDEO_DURATION;
  payload: number;
};

export type VideoAction =
  | PlayVideoAction
  | PauseVideoAction
  | SeekVideoAction
  | UpdateVideoTimeAction
  | SetVideoDurationAction;