import { POSITIONS } from './positions';
import { DetailAnimationTypes, HumanMeshBodyParts } from './types';

export const ANIMATION_CONFIG = new Map([
    ['grab_triceps', {
        name: "Double Leg Setup",
        icon: 'pan_tool',
        skeleton: 'takedowns1',
        fromFrame: 20,
        toFrame: 35,
        transitions: ['triceps_grab_to_necktie'],
        details: [
            {
                detailId: 'triceps_grip',
                label: "Triceps Grip",
                icon: 'pan_tool',
                ssml: "Use the grip to pull opponent back and down. ",
                cameraOption: {
                    bonesToFollow: [null, HumanMeshBodyParts.LEFT_HAND],
                    position: {
                        alpha: 3.0629,
                        beta: 1.414,
                        radius: 152.496
                    }
                }
            }
        ]
    }],
    ['triceps_grab_to_necktie', {
        name: "Necktie",
        skeleton: 'takedowns1',
        fromFrame: 35,
        toFrame: 60,
        transitions: ['necktie_push_head'],
        details: [
            {
                detailId: 'triceps_grip',
                label: "Triceps Grip",
                icon: 'pan_tool',
                ssml: "Further break opponent's balance by yanking down with the triceps grip. ",
                cameraOption: {
                    bonesToFollow: [null, HumanMeshBodyParts.LEFT_HAND],
                    position: {
                        alpha: -2.3703,
                        beta: 1.515,
                        radius: 312
                    }
                },
                animationOption: {
                    type: DetailAnimationTypes.REANIMATE
                }
            },
            {
                detailId: 'neck_tie',
                label: "Neck Tie",
                icon: 'info',
                ssml: "With the opponent's posture broken, use the right arm to get the neck tie. " +
                    "This involves cupping the back of opponent's head and pull it towards your own shoulder and biceps. ",
                cameraOption: {
                    bonesToFollow: [null, HumanMeshBodyParts.RIGHT_HAND],
                    position: {
                        alpha: 0.5848,
                        beta: 0.69,
                        radius: 142
                    }
                },
            }
        ]
    }],
    ['necktie_push_head', {
        name: "Push Head Away",
        skeleton: 'takedowns1',
        fromFrame: 60,
        toFrame: 70,
        transitions: ['double_leg_shoot'],
        details: [
            {
                detailId: 'push_head',
                label: "Push Head",
                icon: 'info',
                ssml: "Pushing opponent's head away makes his body sideways against yours.  " +
                    "His right leg is now exposed. "
            }
        ]
    }],
    ['double_leg_shoot', {
        name: "Shoot",
        skeleton: 'takedowns1',
        fromFrame: 70,
        toFrame: 80,
        transitions: ['double_leg_lift_nearside_leg'],
        details: [
            {
                detailId: 'shoot',
                label: "Shoot",
                icon: 'info',
                ssml: "Bend the knees, change level and shoot in. " +
                    "Since his right leg is already exposed, the your left arm can easily wrap that leg. " +
                    "The shoot would enable the right hand to reach opponent's left leg"
            }
        ]
    }],
    ['double_leg_lift_nearside_leg', {
        name: "Lift Nearside Leg",
        skeleton: 'takedowns1',
        fromFrame: 80,
        toFrame: 90,
        transitions: ['double_leg_drive_sideways'],
        details: [
            {
                detailId: 'lift',
                label: "The lift",
                icon: 'info',
                ssml: "The right hand cups and block opponent's left leg. " +
                    "Now lift opponent's right leg. "
            }
        ]
    }],
    ['double_leg_drive_sideways', {
        name: "Drive Sideways",
        skeleton: 'takedowns1',
        fromFrame: 90,
        toFrame: 115,
        transitions: POSITIONS.get('side_control').transitions,
        details: [
            {
                detailId: 'drive_sideways',
                label: "Drive Sideways",
                icon: 'info',
                ssml: "Lift opponent's near leg while pulling on opponent's far leg like a steering wheel. " +
                    "At the same time drive forward into opponent. " +
                    "Finish the takedown in side control. "
            }
        ]
    }],
    ['imanari_roll_s1', {
        name: "Imanari Roll (Success)",
        icon: "360",
        skeleton: 'takedowns1',
        fromFrame: 130,
        toFrame: 140,
        transitions: ['imanari_roll_s2'],
        details: [
            {
                detailId: 'entry',
                label: "Immanari Entry",
                icon: 'info',
                ssml: "Drive forward while extending the right arm with palm facing outwards and thumbs down. " +
                    "At the same time roll to your back. "
            }
        ]
    }],
    ['imanari_roll_s2', {
        name: "Invert and grab with 2 hands",
        icon: "rotate_right",
        skeleton: 'takedowns1',
        fromFrame: 140,
        toFrame: 150,
        transitions: ['imanari_roll_s3'],
        details: [
            {
                detailId: 'inversion',
                label: "Inversion",
                icon: 'info',
                ssml: "Use both hands to grab opponent's leg and pull. " +
                    "This allows folding of the body into an inversion. "
            },
            {
                detailId: 'legs',
                label: "Legs",
                icon: 'info',
                ssml: "Note that your right leg would go through between opponent's legs. " +
                    "The left leg is on the outside. "
            }
        ]
    }],
    ['imanari_roll_s3', {
        name: "Figure of 4 with legs",
        skeleton: 'takedowns1',
        fromFrame: 150,
        toFrame: 180,
        transitions: ['imanari_roll_s4', 'imanari_turn_leg'],
        details: [
            {
                detailId: 'legs',
                label: "Legs",
                icon: 'info',
                ssml: "The right leg carries on going between opponent's legs. " +
                    "the left swings around the back and lock up a triangle. " +
                    "Make sure the triangle pinches tight on opponent's thigh. " +
                    "This entanglement should make opponent lose balance and fall back. "
            }
        ]
    }],
    ['imanari_roll_s4', {
        name: "Expose Opponent heel",
        skeleton: 'takedowns1',
        fromFrame: 180,
        toFrame: 190,
        transitions: ['imanari_roll_s5'],
        details: [
            {
                detailId: 'expose_heel',
                label: "Expose the Heel",
                icon: 'info',
                ssml: "Bring elbow around and under opponent's heel to expose it for attack. " 
            },
            {
                detailId: 'legs',
                label: "Legs",
                icon: 'info',
                ssml: "The triangle above the knee stop the knee from turning. " +
                    "This is so when the foot is turned via the heel, " +
                    "the knee would would have no where to go but to pop. " +
                    "The left foot hook behind opponent's right leg to stop it from escaping. "
            }
        ]
    }],
    ['imanari_roll_s5', {
        name: "Finish with heel hook",
        skeleton: 'takedowns1',
        fromFrame: 190,
        toFrame: 210,
        transitions: [],
        details: [
            {
                detailId: 'finish',
                label: "Finish",
                icon: 'info',
                ssml: "Keeping the legs tight, crank the heel gets the tap. " +
                    "Other way is to hip up similar to an armbar which makes it " +
                    "harder for opponent to roll with the rotation. " +
                    "Note there is a small distance between no pain to the knee popping. " +
                    "Attacker should put it on slowly or even just hold it without cranking. " +
                    "Receiver if realising that the heel hook is in place and unable to escape should tap. "
            },
        ]
    }],
]);
