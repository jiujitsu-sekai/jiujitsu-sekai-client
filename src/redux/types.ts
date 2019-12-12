export interface CameraPositionType {
  alpha: number,
  beta: number,
  radius: number
}

export interface CameraOptionType {
  zoomLevel: number,
  followFighters: boolean,
  rotationSensitivity: number,
  bonesToFollow: Array<any>,
  position: CameraPositionType,
  prevPosition: CameraPositionType,
  isAdjusting: boolean,
  highlightAvatar: boolean
}


export interface ControlPanelSettingTypes {
  selectedTab: number
}

export const ControlPanelTabs = {
  TIMELINE: 1,
  CAMERA_OPTION: 2,
  DETAILS: 3
}

export const AnimationStatus = {
  RUN_TO_NEXT_FRAME: 'RUN_TO_NEXT_FRAME',
  STOPPED: 'STOPPED',
  REWIND: 'REWIND',
  KEEP_RUNNING: 'KEEP_RUNNING',
  FRAME_ENDED: 'FRAME_ENDED',
  PAUSE_ON_NEXT_FRAME: 'PAUSE_ON_NEXT_FRAME'
};

export const Sections = {
  EXPLORE: 'Explore',
  SEARCH: 'Search',
  THEME: 'THEME'
}

export const FloorTypes = {
  PLAIN: 'Plain',
  NONE: 'None',
  TEXTURE: 'Texture'
}