import {CameraOptionType} from '../redux/types';

export const DetailAnimationTypes = {
    REANIMATE: 'REANIMATE'
}

export interface DetailAnimationOptionType {
    type: string
}

export interface AnimationDetailsType {
    detailId: string,
    label: string,
    icon?: string,
    ssml: string,
    cameraOption?: CameraOptionType,
    animationOption?: DetailAnimationOptionType
}

export const HumanMeshBodyParts = {
    CHEST: "chest",
    HEAD: "head",
    HIPS: "hips",
    LEFT_FOOT: "foot.L",
    LEFT_FOREARM: "forearm.L",
    LEFT_HAND: "hand.ik.L",
    LEFT_KNEE: "Knee.L",
    LEFT_SHIN: "shin.L",
    LEFT_THIGH: "thigh.L",
    LEFT_UPPER_ARM: "upper_arm.L",
    NECK: "neck",
    RIGHT_FOOT: "foot.R",
    RIGHT_FOREARM: "forearm.R",
    RIGHT_HAND: "hand.ik.R",
    RIGHT_KNEE: "Knee.R",
    RIGHT_SHIN: "shin.R",
    RIGHT_THIGH: "thigh.R",
    RIGHT_UPPER_ARM: "upper_arm.R",
    SPINE: "spine"
}