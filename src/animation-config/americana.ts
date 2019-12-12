import { HumanMeshBodyParts, DetailAnimationTypes } from './types';

export const ANIMATION_CONFIG = new Map([
    ['americana_entry1', {
        name: "Grab far arm (Americana entry)",
        skeleton: 'americana1',
        fromFrame: 60,
        toFrame: 80,
        transitions: ['americana']
    }],
    ['americana', {
        name: "Lock up figure of four",
        skeleton: 'americana1',
        fromFrame: 80,
        toFrame: 100,
        transitions: ['americana_finish'],
        details: [
            {
                detailId: 'hand_positions',
                label: 'Hand positions',
                icon: 'pan_tool',
                ssml: "Hold opponent wrist with left hand using monkey grip. " +
                    "Weave right hand under opponent's arm and hold your own wrist." +
                    " Again using monkey grip.",
                cameraOption: {
                    bonesToFollow: [null, HumanMeshBodyParts.LEFT_HAND],
                    position: {
                        alpha: 8.4127,
                        beta: 0.98312,
                        radius: 86.6853
                    }
                },
                animationOption: {
                    type: DetailAnimationTypes.REANIMATE
                }
            },
            {
                detailId: 'elbow_positions',
                label: 'Elbow positions',
                ssml: "Ensure that elbows are tight against opponent",
                bonesToFollow: [null, HumanMeshBodyParts.LEFT_HAND],
                cameraOption: {
                    bonesToFollow: [null, HumanMeshBodyParts.RIGHT_HAND],
                    position: {
                        alpha: 5.226,
                        beta: 1.11487,
                        radius: 86.70331
                    }
                }
            }
        ]
    }],
    ['americana_finish', {
        name: "Pull elbow towards hip and up",
        skeleton: 'americana1',
        fromFrame: 100,
        toFrame: 125,
        transitions: [],
        details: [
            {
                detailId: 'finish',
                label: 'Finish',
                ssml: "Keep opponent's elbow as close to his ribs as possible. " +
                    "Raise his elbow while sliding his hand on the floor towards his hips." +
                    "This movement is similar to a stroke with a paint brush. Opponent taps"
            }
        ]
    }]
]);