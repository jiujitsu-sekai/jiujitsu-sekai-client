import {
    ANIMATION_CONFIG,
    INIT_ACTION,
    getTransitions,
} from '../animation-config/config'
import { HumanMeshBodyParts } from '../animation-config/types'
import { AnimationStatus, Sections } from './types'

import {
    RUN_TO_FRAME,
    KEEP_RUNNING,
    SET_ANIMATION_STATUS,
    REWIND_ANIMATION,
    RESTART_ANIMATION,
    PAUSE_ANIMATION,
    SET_TITLE,
    SET_SECTION,
    JUMP_TO_ANIMATION,
    BACK_TO_PREV_JUMP,
    SET_AVATAR,
    SET_AVATAR_COLOUR,
    SET_BACKGROUND_COLOUR,
    SET_FLOOR_COLOUR,
    SET_ENABLE_REFLECTION,
    SET_ENABLE_SHADLOW,
    SET_SKY_BOX,
    SET_FLOOR_TEXTURE,
    CAMERA_OPTION_ZOOM_IN,
    CAMERA_OPTION_ZOOM_OUT,
    SET_CAMERA_FOLLOW_FIGHTERS,
    SET_CAMERA_ROTATION_SENSITIVITY,
    CAMERA_OPTION_BONES_TO_FOLLOW,
    CAMERA_RESET_POSITION_BONES_TO_FOLLOW,
    SET_MUTE,
    SET_IS_ANIMATING,
    SET_CAMERA_POSITION,
    SET_CONTROL_PANEL_SETTINGS,
    SET_APP_STATUS,
    SET_CAMERA_POSITION_BONES_TO_FOLLOW,
    SET_CAMERA_IS_ADJUSTING,
    SET_CAMERA_HIGHLIGHT_AVATAR,
    SET_SWAP_SKELETON,
} from './actions'
import '@babylonjs/core'

const _initAnimation = ANIMATION_CONFIG.get(INIT_ACTION)

const INITIAL_STATE = {
    currentAnimation: _initAnimation,
    jumpedToAnimation: _initAnimation,
    animationStatus: AnimationStatus.STOPPED,
    animationHistory: [_initAnimation],
    transitions: getTransitions(_initAnimation),
    section: Sections.SEARCH,
    title: 'Shake hands',
    swapSkeleton: false,
    animationRestriction: <Map<string, Array<string>>>new Map(),
    theme: {
        avatars: [null, null],
        avatarColours: [null, null],
        backgroundColour: [0.3, 0.3, 0.3],
        floorColour: [1, 1, 1],
        enableShadow: true,
        enableReflection: false,
        skyBoxName: 'TropicalSunnyDay',
        floorTexture: 'tatami.jpg',
    },
    cameraOption: {
        zoomLevel: 0,
        followFighters: true,
        rotationSensitivity: 0.5,
        bonesToFollow: [HumanMeshBodyParts.HIPS, HumanMeshBodyParts.HIPS],
        position: null,
        isAdjusting: false,
        highlightAvatar: true,
    },
    mute: false,
    isAnimating: false,
    controlPanelSettings: {
        selectedTab: 1,
    },
    appStatus: '',
}

function _addAnimationHistory(state = INITIAL_STATE) {
    if (
        state.animationHistory[state.animationHistory.length - 1] !=
        state.currentAnimation
    ) {
        state.animationHistory = state.animationHistory.concat([
            state.currentAnimation,
        ])
    }
    return state
}

export const reducer = (state = INITIAL_STATE, action) => {
    var animation
    switch (action.type) {
        case RUN_TO_FRAME:
            animation = action.currentAnimation || state.currentAnimation
            return _addAnimationHistory({
                ...state,
                currentAnimation: animation,
                animationStatus: AnimationStatus.RUN_TO_NEXT_FRAME,
                transitions: getTransitions(animation),
                title: animation.name,
            })
        case KEEP_RUNNING:
            return _addAnimationHistory({
                ...state,
                currentAnimation: action.currentAnimation,
                animationStatus: AnimationStatus.KEEP_RUNNING,
                transitions: getTransitions(action.currentAnimation),
                title: action.currentAnimation.name,
            })
        case PAUSE_ANIMATION:
            return _addAnimationHistory({
                ...state,
                animationStatus: AnimationStatus.PAUSE_ON_NEXT_FRAME,
            })
        case REWIND_ANIMATION:
            var animationHistory = state.animationHistory
            var currentAnimation = animationHistory[animationHistory.length - 1]
            animationHistory = animationHistory.splice(
                0,
                state.animationHistory.length - 1
            )
            var endAnimation = animationHistory[animationHistory.length - 1]

            return {
                ...state,
                currentAnimation: currentAnimation,
                animationStatus: AnimationStatus.REWIND,
                animationHistory: animationHistory,
                transitions: getTransitions(
                    endAnimation,
                    state.animationRestriction
                ),
                title: endAnimation.name,
            }
        case RESTART_ANIMATION:
            return {
                ...INITIAL_STATE,
                animationStatus: AnimationStatus.RUN_TO_NEXT_FRAME,
                theme: state.theme,
                cameraOption: state.cameraOption,
            }
        case SET_ANIMATION_STATUS:
            var animatingStatuses = [
                AnimationStatus.KEEP_RUNNING,
                AnimationStatus.PAUSE_ON_NEXT_FRAME,
                AnimationStatus.REWIND,
                AnimationStatus.RUN_TO_NEXT_FRAME,
            ]

            var isAnimating =
                animatingStatuses.indexOf(action.animationStatus) != -1

            var currentAnimation = state.currentAnimation
            if (
                state.isAnimating &&
                !isAnimating &&
                state.animationStatus == AnimationStatus.REWIND
            ) {
                currentAnimation =
                    state.animationHistory[state.animationHistory.length - 1]
            }

            return {
                ...state,
                currentAnimation: currentAnimation,
                animationStatus: action.animationStatus,
                isAnimating: isAnimating,
            }
        case SET_TITLE:
            return {
                ...state,
                title: action.title,
            }
        case SET_SWAP_SKELETON:
            return {
                ...state,
                swapSkeleton: action.swapSkeleton,
            }
        case SET_SECTION:
            return {
                ...state,
                section: action.section,
                title: '',
            }
        case JUMP_TO_ANIMATION:
            animation = ANIMATION_CONFIG.get(action.animationId)
            return {
                ...INITIAL_STATE,
                jumpedToAnimation: animation,
                animationHistory: [animation],
                currentAnimation: animation,
                animationStatus: AnimationStatus.RUN_TO_NEXT_FRAME,
                transitions: getTransitions(
                    animation,
                    action.animationRestriction
                ),
                animationRestriction: action.animationRestriction,
                title: action.name,
                theme: state.theme,
                cameraOption: state.cameraOption,
            }
        case BACK_TO_PREV_JUMP:
            return {
                ...state,
                currentAnimation: state.jumpedToAnimation,
                animationStatus: AnimationStatus.RUN_TO_NEXT_FRAME,
                transitions: getTransitions(
                    state.jumpedToAnimation,
                    state.animationRestriction
                ),
            }
        case SET_AVATAR:
            var avatars = state.theme.avatars.slice(0)
            avatars[action.player] = action.avatar

            return {
                ...state,
                theme: {
                    ...state.theme,
                    avatars: avatars,
                },
            }
        case SET_AVATAR_COLOUR:
            var colours = state.theme.avatarColours.slice(0)
            colours[action.player] = action.avatarColour

            return {
                ...state,
                theme: {
                    ...state.theme,
                    avatarColours: colours,
                },
            }
        case SET_BACKGROUND_COLOUR:
            return {
                ...state,
                theme: {
                    ...state.theme,
                    backgroundColour: action.backgroundColour,
                },
            }
        case SET_FLOOR_COLOUR:
            return {
                ...state,
                theme: {
                    ...state.theme,
                    floorColour: action.floorColour,
                },
            }
        case SET_ENABLE_SHADLOW:
            return {
                ...state,
                theme: {
                    ...state.theme,
                    enableShadow: action.enable,
                },
            }
        case SET_ENABLE_REFLECTION:
            return {
                ...state,
                theme: {
                    ...state.theme,
                    enableReflection: action.enable,
                },
            }
        case SET_SKY_BOX:
            return {
                ...state,
                theme: {
                    ...state.theme,
                    skyBoxName: action.skyBoxName,
                },
            }
        case SET_FLOOR_TEXTURE:
            return {
                ...state,
                theme: {
                    ...state.theme,
                    floorTexture: action.floorTexture,
                },
            }
        case CAMERA_OPTION_ZOOM_IN:
            return {
                ...state,
                cameraOption: {
                    ...state.cameraOption,
                    zoomLevel: state.cameraOption.zoomLevel - 1,
                },
            }
        case CAMERA_OPTION_ZOOM_OUT:
            return {
                ...state,
                cameraOption: {
                    ...state.cameraOption,
                    zoomLevel: state.cameraOption.zoomLevel + 1,
                },
            }
        case SET_CAMERA_FOLLOW_FIGHTERS:
            return {
                ...state,
                cameraOption: {
                    ...state.cameraOption,
                    followFighters: action.followFighters,
                },
            }
        case SET_CAMERA_HIGHLIGHT_AVATAR:
            return {
                ...state,
                cameraOption: {
                    ...state.cameraOption,
                    highlightAvatar: action.highlightAvatar,
                },
            }
        case SET_CAMERA_ROTATION_SENSITIVITY:
            return {
                ...state,
                cameraOption: {
                    ...state.cameraOption,
                    rotationSensitivity: action.rotationSensitivity,
                },
            }
        case CAMERA_OPTION_BONES_TO_FOLLOW:
            return {
                ...state,
                cameraOption: {
                    ...state.cameraOption,
                    bonesToFollow: action.bonesToFollow,
                },
            }
        case CAMERA_RESET_POSITION_BONES_TO_FOLLOW:
            return {
                ...state,
                cameraOption: {
                    ...state.cameraOption,
                    bonesToFollow: INITIAL_STATE.cameraOption.bonesToFollow,
                    position: null,
                    isAdjusting: action.smooth,
                },
            }
        case SET_CAMERA_POSITION:
            return {
                ...state,
                cameraOption: {
                    ...state.cameraOption,
                    position: action.position,
                },
            }
        case SET_CAMERA_POSITION_BONES_TO_FOLLOW:
            return {
                ...state,
                cameraOption: {
                    ...state.cameraOption,
                    position: action.position || state.cameraOption.position,
                    bonesToFollow:
                        action.bonesToFollow ||
                        state.cameraOption.bonesToFollow,
                    isAdjusting: true,
                },
            }
        case SET_CAMERA_IS_ADJUSTING:
            return {
                ...state,
                cameraOption: {
                    ...state.cameraOption,
                    isAdjusting: action.isAdjusting,
                },
            }
        case SET_MUTE:
            return {
                ...state,
                mute: action.mute,
            }
        case SET_IS_ANIMATING:
            return {
                ...state,
                isAnimating: action.isAnimating,
            }
        case SET_CONTROL_PANEL_SETTINGS:
            return {
                ...state,
                controlPanelSettings: action.controlPanelSettings,
            }
        case SET_APP_STATUS:
            return {
                ...state,
                appStatus: action.appStatus,
            }
        default:
            return state
    }
}

const getCurrentAnimationSelector = state => state.currentAnimation
