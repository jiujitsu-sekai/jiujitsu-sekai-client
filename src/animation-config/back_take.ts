import { DetailAnimationTypes, HumanMeshBodyParts } from './types';

const RNC_CAMERA_OPTION = {
    bonesToFollow: [null, HumanMeshBodyParts.RIGHT_FOREARM],
    position: {
        alpha: 3,
        beta: 0.748,
        radius: 150
    }
}


export const ANIMATION_CONFIG = new Map([
    ['chair_sit', {
        name: "Chair Sit",
        skeleton: 'toreando_pass1',
        fromFrame: 100,
        toFrame: 120,
        transitions: ['cs_step_over'],
        details: [
            {
                detailId: 'left_leg',
                label: 'Left Leg',
                ssml: "Left leg slides under opponent's head like a pillow",
                cameraOption: {
                    bonesToFollow: [null, HumanMeshBodyParts.LEFT_THIGH],
                    position: {
                        alpha: 0.925,
                        beta: 1.223,
                        radius: 175
                    }
                },
            },
            {
                detailId: 'arms',
                label: 'Arms',
                ssml: "Tie up a seat belt with the arms",
                cameraOption: {
                    bonesToFollow: [null, HumanMeshBodyParts.RIGHT_FOREARM],
                    position: {
                        alpha: 0.188,
                        beta: 1.12,
                        radius: 141
                    }
                }
            }
        ]
    }],
    ['cs_step_over', {
        name: "Step Over",
        skeleton: 'toreando_pass1',
        fromFrame: 120,
        toFrame: 140,
        transitions: ['cs_take_back'],
        details: [
            {
                detailId: 'right_leg',
                label: 'Right Leg',
                ssml: "Ensure that the right leg is tight against opponent's body " +
                    "so that he cannot being a knee inside the gap"
            }
        ]
    }],
    ['cs_take_back', {
        name: "Take Back",
        skeleton: 'toreando_pass1',
        fromFrame: 140,
        toFrame: 160,
        transitions: ['back_second_hook'],
        details: [
            {
                detailId: 'rotation',
                label: 'Rotate',
                ssml: 'Rotate the body so that opponent now faces the opposite direction. ' +
                    'Use the seat belt to glue yourself against your opponent. ' +
                    'Use your high posture from chair sit to fall and generate momentum'
            },
            {
                detailId: 'bottom_hook',
                label: 'Bottom Hook',
                ssml: 'Notice that after the rotation, the bottom hook is already in place'
            }
        ]
    }],
    ['back_second_hook', {
        name: "Insert Second Hook",
        skeleton: 'toreando_pass1',
        fromFrame: 160,
        toFrame: 180,
        transitions: ['rnc_bottom_arm_under_chin', 'back_roll_weakside'],
        details: [
            {
                detailId: 'second_hook',
                label: 'Insert Second Hook',
                ssml: 'Now insert the second hook. ' +
                    'Note that if opponent defends by bringing the knee closer to the chest, ' + 
                    'you would need to hip escape to insert from a higher angle. ' +
                    'You would also need to use your heel to dig the hook in',
                cameraOption: {
                    bonesToFollow: [null, HumanMeshBodyParts.LEFT_FOOT],
                    position: {
                        alpha: 3.16,
                        beta: 0.634,
                        radius: 150
                    }
                },
                animationOption: {
                    type: DetailAnimationTypes.REANIMATE
                }
            },
            {
                detailId: 'ibjjf_points',
                label: 'IBJJF Points',
                ssml: 'In IBJJF rules, after the second hook is in, you will score 4 points'
            }
        ]
    }],
    ['rnc_bottom_arm_under_chin', {
        name: "Arm under the chin",
        skeleton: 'toreando_pass1',
        fromFrame: 180,
        toFrame: 200,
        transitions: ['rnc_lock_up_second_arm'],
        details: [
            {
                detailId: 'arm_under_chin',
                label: 'Arm Under Chin',
                ssml: 'Bring the right arm deep under the chin so that the forearm and biceps ' +
                    'would put pressure on the opponents left and right carotid artery respectively.',
                cameraOption: RNC_CAMERA_OPTION
            }
        ]
    }],
    ['rnc_lock_up_second_arm', {
        name: "Lock up the Rear Naked Choke",
        skeleton: 'toreando_pass1',
        fromFrame: 200,
        toFrame: 220,
        transitions: ['rnc_finish'],
        details: [
            {
                detailId: 'left_arm',
                label: 'Left Arm',
                ssml: "Bring left forearm behind opponent's head while the right hand slides into the bend of the left arm",
                cameraOption: RNC_CAMERA_OPTION
            }
        ]
    }],
    ['rnc_finish', {
        name: "Squeeze and Finish!",
        skeleton: 'toreando_pass1',
        fromFrame: 220,
        toFrame: 240,
        transitions: [],
        details: [
            {
                detailId: 'the_squeeze',
                label: 'The Squeeze',
                ssml: "Use the left forearm to push or chop opponent's head forward and into the choke. " +
                    "Flex upper back muscle to bring both elbows back. " +
                    "This would further amplify the chop of the left forearm and restriction of the right arm. " +
                    "Opponent taps.",
                cameraOption: RNC_CAMERA_OPTION
            },
            {
                detailId: 'chest',
                label: 'Chest ',
                ssml: "To make the choke more powerful we could breath in and puff out our chest"
            },
            {
                detailId: 'hip',
                label: 'Hip ',
                ssml: "To make the position more secure and less comfortable for " +
                    "the opponent we could thrust our hip forward"
            }
        ]
    }],
    ['back_roll_weakside', {
        name: "Roll to Weak side.",
        skeleton: 'back1',
        fromFrame: 20,
        toFrame: 60,
        transitions: ['back_escape1'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'weak_side',
                label: 'Weak Side',
                ssml: "Traditionally the choking arm should be under the opponent's neck so his head and shoulder cannot touch the floor. " +
                    "This is called the strong side and is good for preventing certain types of back escapes and can produce a more powerful choke." +
                    "Knowing this we will go to the opposite side known as the weak side for the escsape. "
            },
            {
                detailId: 'hands',
                label: 'Hands',
                ssml: "Ensure that the hands are in position to stop the choking arm getting under the neck. "
            },
            {
                detailId: 'head',
                label: 'Head',
                ssml: "Bring the head to the other side and try to touch the mat with the head and shoulder. "
            }
        ]
    }],
    ['back_escape1', {
        name: "Block knee, twist and move up.",
        skeleton: 'back1',
        fromFrame: 60,
        toFrame: 80,
        transitions: ['back_escape2'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'hand',
                label: 'Hand',
                ssml: "Once the head and shoulder is on the mat, opponent would find it difficult to finish the choke. " +
                    "You can now free the hand and push on opponent's"
            },
            {
                detailId: 'legs',
                label: 'Legs',
                ssml: "Walk the legs so that you twist your hip. By doing so, you hips should also be raised. "
            }
        ]
    }],
    ['back_escape2', {
        name: "Pummel top leg and extend",
        skeleton: 'back1',
        fromFrame: 80,
        toFrame: 110,
        transitions: ['back_escape3'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'top_leg',
                label: 'Top Leg',
                ssml: "Pummel the top leg inside and extend to stretch the opponent's leg forward"
            },
        ]
    }],
    ['back_escape3', {
        name: "Escape the back",
        skeleton: 'back1',
        fromFrame: 110,
        toFrame: 150,
        transitions: ['back_escape4'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'button_leg',
                label: 'Bottom Leg',
                ssml: "Take the bottom leg out and step away and in front of opponent."
            },
            {
                detailId: 'body',
                label: 'Body',
                ssml: "Put weight on opponent, but do not over commit or you might get rolled."
            },
            {
                detailId: 'hands',
                label: 'Hands',
                ssml: "Although it is difficult for opponent to finish the choke, it is still a good idea to check the " + 
                    "choking arm to release presssure until you are ready for the next step. "
            },
        ]
    }],
    ['back_escape4', {
        name: "Back into close guard",
        skeleton: 'back1',
        fromFrame: 150,
        toFrame: 190,
        transitions: [],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'why',
                label: 'Why',
                ssml: "Although it is tempting to roll away instead of back into the close guard, but by doing so " +
                    "the opponent would continue to chase the back. Being in close guard is an improvement from having the back taken"
            },
            {
                detailId: 'bridge',
                label: 'Bridge',
                ssml: "To add more leverage into the bridge, bring the right foot out and use it to push your hips up."
            }
        ]
    }]
]);