import { POSITIONS } from './positions';
import { DetailAnimationTypes, HumanMeshBodyParts } from './types';

const KIMURA_CAMERA_OPTION = {
    bonesToFollow: [null, HumanMeshBodyParts.LEFT_HAND],
    position: {
        alpha: 6.7,
        beta: 1.01,
        radius: 100
    }
};

export const ANIMATION_CONFIG = new Map([
    ['sc_turn_away', {
        name: "Opponent turns away",
        skeleton: 'side_control1',
        fromFrame: 20,
        toFrame: 40,
        transitions: POSITIONS.get('sc_uke_looks_away').transitions,
        details: [
            {
                detailId: 'how',
                label: 'How',
                ssml: "This happens either opponent attempts to roll away " + 
                    "and turtle or certain pass forces opponent to face away",
                icon: 'info'
            },
            {
                detailId: 'pressure',
                label: 'Pressure',
                ssml: "Keep pressure on opponent's to stop him from flattening again",
                icon: 'info'
            },
            {
                detailId: 'arm_elbow',
                label: 'Far Elbow',
                ssml: "If the opponent continues to turtle, pulling the far elbow is " + 
                    "an option to stop that. You could also use that to flatten the " + 
                    "opponent again.",
                icon: 'info'
            },
        ]
    }],
    ['sc_to_back_to_flat', {
        name: "Turn back flat on the back",
        skeleton: 'side_control1',
        fromFrame: 40,
        toFrame: 60,
        transitions: POSITIONS.get('side_control').transitions,
        details: [
            {
                detailId: 'how',
                label: 'How',
                ssml: "Opponent realised the danger of exposing the back " + 
                    "and returns to the chest to chest side control. " +
                    "Alternatively, you realised the opponent is likely to " + 
                    "turtle and you force him back on his back",
                icon: 'info'
            }
        ]
    }],
    ['sc_kimura_prep', {
        name: "Kimura entry",
        skeleton: 'side_control1',
        fromFrame: 60,
        toFrame: 80,
        transitions: ['sc_kimura_grip'],
        details: [
            {
                detailId: 'pull_dominance',
                label: 'Pull Dominance',
                ssml: "This variation is called the pull dominance kimura. " +
                    "Instead of turning opponent to his side, sitting and " +
                    "clamping opponent's shoulders, we keep him flat on his back. " +
                    "We also keep his wrist on the mat. ",
                icon: 'info'
            },
            {
                detailId: 'body',
                label: 'Body',
                ssml: "Move towards north south. Perhaps at 45 degrees angle",
                icon: 'info'
            },
            {
                detailId: 'hands',
                label: 'Hands',
                ssml: "Right hand grabs opponent's wrist with a monkey grip, " +
                    "left hand slides under opponent's armpit",
                icon: 'pan_tool',
                cameraOption: KIMURA_CAMERA_OPTION
            }
        ]
    }],
    ['sc_kimura_grip', {
        name: "Lock in the Kimura",
        skeleton: 'side_control1',
        fromFrame: 80,
        toFrame: 100,
        transitions: ['sc_kimura_finish'],
        details: [
            {
                detailId: 'hands',
                label: 'Hands',
                ssml: "Left hand grabs your own right wrist, again with a monkey grip",
                icon: 'pan_tool',
                cameraOption: KIMURA_CAMERA_OPTION,
                animationOption: {
                    type: DetailAnimationTypes.REANIMATE
                }
            },
            {
                detailId: 'hips',
                label: 'Hips',
                ssml: "Your hips is now turned and your left knee is up",
                icon: 'info'
            }
        ]
    }],
    ['sc_kimura_finish', {
        name: "Full elbow up and finish",
        skeleton: 'side_control1',
        fromFrame: 100,
        toFrame: 120,
        transitions: [],
        details: [
            {
                detailId: 'finish',
                label: 'Finish',
                ssml: "Pin opponent's wrist firmly on the mat. " +
                    "Turn your body away from your opponent while pulling " +
                    "your left elbow up. Opponent taps.",
                icon: 'info'
            },
        ]
    }],
]);