export const PLAY_VIDEO = 'PLAY_VIDEO';
export const PAUSE_VIDEO = 'PAUSE_VIDEO';
export const SEEK_VIDEO = 'SEEK_VIDEO';
export const UPDATE_VIDEO_TIME = 'UPDATE_VIDEO_TIME';
export const SET_VIDEO_DURATION = 'SET_VIDEO_DURATION';

export const playVideo = () => ({
  type: PLAY_VIDEO,
});

export const pauseVideo = () => ({
  type: PAUSE_VIDEO,
});

export const seekVideo = (time: number) => ({
  type: SEEK_VIDEO,
  payload: time,
});

export const updateVideoTime = (time: number) => ({
  type: UPDATE_VIDEO_TIME,
  payload: time,
});

export const setVideoDuration = (duration: number) => ({
  type: SET_VIDEO_DURATION,
  payload: duration,
});