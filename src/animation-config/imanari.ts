import { POSITIONS } from './positions';
import { DetailAnimationTypes, HumanMeshBodyParts } from './types';

const SITTING_TRANSITIONS = POSITIONS.get('sitting_guard').transitions;

export const ANIMATION_CONFIG = new Map([
    ['imanari_roll_fail', {
        name: "Imanari Roll (Fail)",
        icon: "360",
        skeleton: 'imanari1',
        fromFrame: 20,
        toFrame: 55,
        transitions: SITTING_TRANSITIONS,
        details: [
            {
                detailId: 'entry',
                label: "Immanari Entry",
                icon: 'info',
                ssml: "Drive forward while extending the right arm with palm facing outwards and thumbs down. " +
                    "At the same time roll to your back. "
            },
            {
                detailId: 'escape',
                label: "Escape",
                icon: 'block',
                ssml: "Unfortunately opponent escapes by pulling his left foot away"
            }
        ],
        swapSkeletons: SITTING_TRANSITIONS
    }],
    ['imanari_turn_leg', {
        name: "Defend leg lock",
        skeleton: 'imanari1',
        fromFrame: 180,
        toFrame: 200,
        transitions: ['saddle_spin'],
        details: [
            {
                detailId: 'leg',
                label: "Leg",
                icon: 'info',
                ssml: "Straighten the leg deeper and turn the toes away. We will pull the leg out at the when we start to roll later."
            },
            {
                detailId: 'posture',
                label: "Posture",
                icon: 'info',
                ssml: "sit up and turn your body so that your toes faces outwards."
            }
        ],
        highlightAvatar: 0
    }],
    ['saddle_spin', {
        name: "Spin",
        skeleton: 'imanari1',
        fromFrame: 200,
        toFrame: 220,
        transitions: ['leglock_kickout'],
        details: [
            {
                detailId: 'spin',
                label: "Spin",
                icon: 'info',
                ssml: "Turn towards direction of the toes. Spinning could losen up the saddle giving you a chance to pull the leg out."
            },
        ],
        highlightAvatar: 0
    }],
    ['leglock_kickout', {
        name: "Kick and pull leg out",
        skeleton: 'imanari1',
        fromFrame: 220,
        toFrame: 255,
        transitions: ['leglock_standup'],
        details: [
            {
                detailId: 'right_leg',
                label: "Right Leg",
                icon: 'info',
                ssml: "Push against opponent to create distance.",
                cameraOption: {
                    bonesToFollow: [HumanMeshBodyParts.HIPS, null],
                    position: {
                        alpha: 0.9,
                        beta: 1.25,
                        radius: 249
                    }
                },
                animationOption: {
                    type: DetailAnimationTypes.REANIMATE
                }
            },
            {
                detailId: 'left_leg',
                label: "Left Leg",
                icon: 'info',
                ssml: "Pull the left leg out.",
                cameraOption: {
                    bonesToFollow: [HumanMeshBodyParts.HIPS, null],
                    position: {
                        alpha: 4,
                        beta: 1.34,
                        radius: 233
                    }
                },
                animationOption: {
                    type: DetailAnimationTypes.REANIMATE
                }
            }
        ],
        highlightAvatar: 0
    }],
    ['leglock_standup', {
        name: "Stand up",
        skeleton: 'imanari1',
        fromFrame: 255,
        toFrame: 285,
        transitions: SITTING_TRANSITIONS,
        details: []
    }]
]);