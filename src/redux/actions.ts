import { applyMiddleware } from "redux";

export const RUN_TO_FRAME = 'RUN_TO_FRAME';
export const KEEP_RUNNING = 'KEEP_RUNNING';
export const REWIND_ANIMATION = 'REWIND_ANIMATION';
export const RESTART_ANIMATION = 'RESTART_ANIMATION';
export const PAUSE_ANIMATION = 'PUASE_ANIMATION';
export const SET_ANIMATION_STATUS = 'SET_ANIMATION_STATUS';
export const SET_SECTION = 'SET_SECTION';
export const SET_TITLE = 'SET_TITLE';
export const SET_SWAP_SKELETON = 'SET_SWAP_SKELETON';
export const JUMP_TO_ANIMATION = 'JUMP_TO_ANIMATION';
export const BACK_TO_PREV_JUMP = 'BACK_TO_PREV_JUMP';
export const SET_AVATAR = 'SET_AVATAR';
export const SET_AVATAR_COLOUR = 'SET_AVATAR_COLOUR';
export const SET_BACKGROUND_COLOUR = 'SET_BACKGROUND_COLOUR';
export const SET_FLOOR_COLOUR = 'SET_FLOOR_COLOUR';
export const SET_ENABLE_SHADLOW = 'SET_ENABLE_SHADOW';
export const SET_ENABLE_REFLECTION = 'SET_ENBLE_REFLECTION';
export const SET_SKY_BOX = 'SET_SKY_BOX';
export const SET_FLOOR_TEXTURE = 'SET_FLOOR_TEXTURE';
export const CAMERA_OPTION_ZOOM_IN = 'CAMERA_OPTION_ZOOM_IN';
export const CAMERA_OPTION_ZOOM_OUT = 'CAMERA_OPTION_ZOOM_OUT';
export const CAMERA_OPTION_BONES_TO_FOLLOW = 'CAMERA_OPTION_BONES_TO_FOLLOW';
export const CAMERA_RESET_POSITION_BONES_TO_FOLLOW = 'CAMERA_RESET_POSITION_BONES_TO_FOLLOW';
export const SET_CAMERA_FOLLOW_FIGHTERS = 'CAMERA_FOLLOW_FIGHTERS';
export const SET_CAMERA_HIGHLIGHT_AVATAR = 'CAMERA_HIGHLIGHT_AVATAR';
export const SET_CAMERA_ROTATION_SENSITIVITY = 'SET_CAMERA_ROTATION_SENSITIVITY';
export const SET_CAMERA_POSITION = 'SET_CAMERA_POSITION';
export const SET_CAMERA_POSITION_BONES_TO_FOLLOW = 'SET_CAMERA_POSITION_BONES_TO_FOLLOW';
export const SET_CAMERA_IS_ADJUSTING = 'SET_CAMERA_IS_ADJUSTING';
export const SET_MUTE = 'SET_MUTE';
export const SET_IS_ANIMATING = 'SET_IS_ANIMATING';
export const SET_CONTROL_PANEL_SETTINGS = 'SET_CONTROL_PANEL_SETTINGS';
export const SET_APP_STATUS = 'SET_APP_STATUS';

export const setSection = section => {
  return {
    type: SET_SECTION,
    section: section
  };
};

export const runAnimationToNextFrame = animation => {
  return {
    type: RUN_TO_FRAME,
    currentAnimation: animation,
  };
};

export const rerunAnimation = () => {
  return {
    type: RUN_TO_FRAME
  };
};

export const rewindAnimation = () => {
  return {
    type: REWIND_ANIMATION
  };
};

export const pauseAnimation = () => {
  return {
    type: PAUSE_ANIMATION
  };
};

export const keepRunningAnimation = animation => {
  return {
    type: KEEP_RUNNING,
    currentAnimation: animation,
  };
};

export const restartAnimation = () => {
  return {
    type: RESTART_ANIMATION
  };
};

export const setAnimationStatus = animationStatus => {
  return {
    type: SET_ANIMATION_STATUS,
    animationStatus
  };
};

export const setTitle = title => {
  return {
    type: SET_TITLE,
    title: title,
  };
};

export const setSwapSkeleton = (swapSkeleton: boolean) => {
  return {
    type: SET_SWAP_SKELETON,
    swapSkeleton: swapSkeleton,
  };
};

export const jumpToAnimation = (name: string, animationId: string,
  animationRestriction?: Map<string, Array<string>>) => {
  return {
    type: JUMP_TO_ANIMATION,
    name: name,
    animationId: animationId,
    animationRestriction: animationRestriction || {}
  };
};

export const backToPeviousJump = () => {
  return {
    type: BACK_TO_PREV_JUMP
  };
};

export const setAvatar = (player: number, avatar: string) => {
  return {
    type: SET_AVATAR,
    player: player,
    avatar: avatar
  };
}

export const setAvatarColour = (player: number, colour: object) => {
  return {
    type: SET_AVATAR_COLOUR,
    player: player,
    avatarColour: colour
  };
}

export const setBackgroundColour = (colour: object) => {
  return {
    type: SET_BACKGROUND_COLOUR,
    backgroundColour: colour
  };
}

export const setFloorColour = (colour: object) => {
  return {
    type: SET_FLOOR_COLOUR,
    floorColour: colour
  };
}

export const setEnableShadow = (enable: boolean) => {
  return {
    type: SET_ENABLE_SHADLOW,
    enable: enable
  };
}

export const setEnableReflection = (enable: boolean) => {
  return {
    type: SET_ENABLE_REFLECTION,
    enable: enable
  };
}

export const setSkyBox = (skyBoxName: string) => {
  return {
    type: SET_SKY_BOX,
    skyBoxName: skyBoxName
  };
}

export const setFloorTexture = (floorTexture: string) => {
  return {
    type: SET_FLOOR_TEXTURE,
    floorTexture: floorTexture
  };
}

export const cameraOptionZoomIn = () => {
  return {
    type: CAMERA_OPTION_ZOOM_IN
  };
}

export const cameraOptionZoomOut = () => {
  return {
    type: CAMERA_OPTION_ZOOM_OUT
  };
}

export const setCameraFollowFighters = (followFighters: boolean) => {
  return {
    type: SET_CAMERA_FOLLOW_FIGHTERS,
    followFighters: followFighters
  };
}

export const setCameraHighlightAvatar = (highlightAvatar: boolean) => {
  return {
    type: SET_CAMERA_HIGHLIGHT_AVATAR,
    highlightAvatar: highlightAvatar
  };
}

export const setCameraRotationSensitivity = (rotationSensitivity: number) => {
  return {
    type: SET_CAMERA_ROTATION_SENSITIVITY,
    rotationSensitivity: rotationSensitivity
  };
}

export const setCameraBonesToFollow = (bonesToFollow: Array<any>) => {
  return {
    type: CAMERA_OPTION_BONES_TO_FOLLOW,
    bonesToFollow: bonesToFollow
  };
}

export const resetCameraPositionBonesToFollow = (smooth: boolean) => {
  return {
    type: CAMERA_RESET_POSITION_BONES_TO_FOLLOW,
    smooth: smooth
  };
}

export const setCameraPosition = (position) => {
  return {
    type: SET_CAMERA_POSITION,
    position: position
  };
}

export const setCameraPositionAndBonesToFollow = (position, bonesToFollow: Array<any>) => {
  return {
    type: SET_CAMERA_POSITION_BONES_TO_FOLLOW,
    bonesToFollow: bonesToFollow,
    position: position
  };
}

export const setCameraIsAdjusting = (isAdjusting = true) => {
  return {
    type: SET_CAMERA_IS_ADJUSTING,
    isAdjusting: isAdjusting
  };
}

export const setMute = (mute: boolean) => {
  return {
    type: SET_MUTE,
    mute: mute
  }
}

export const setIsAnimating = (isAnimating: boolean) => {
  return {
    type: SET_IS_ANIMATING,
    isAnimating: isAnimating
  }
}

export const setControlPanelSettings = (controlPanelSettings) => {
  return {
    type: SET_CONTROL_PANEL_SETTINGS,
    controlPanelSettings: controlPanelSettings
  }
}

export const setAppStatus = (appStatus: string) => {
  return {
    type: SET_APP_STATUS,
    appStatus: appStatus
  }
}