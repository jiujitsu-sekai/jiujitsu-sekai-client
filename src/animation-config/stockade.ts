const STOCKADE_TRANSITIONS = ['stockade_leg_over_near_head', 'stockade_leg_over_near_legs', 'stockade_neckcrank'];

export const ANIMATION_CONFIG = new Map([
    ['stockade_entry1', {
        name: "Americana or Stockade Entry",
        skeleton: 'americana1',
        fromFrame: 20,
        toFrame: 60,
        transitions: ['stockade_smack_elbow', 'americana_entry1'],
        details: [
            {
                detailId: 'hands',
                label: 'Hands',
                icon: 'pan_tool',
                ssml: "Block the far elbow. " +
                    "From this position, you can enter into the Stockade or the Americana"
            }
        ]
    }],
    ['stockade_smack_elbow', {
        name: "Smack the elbow, raise the arm",
        skeleton: 'stockade1',
        fromFrame: 255,
        toFrame: 265,
        transitions: ['stockade_armraside_grab_armpit'],
        details: [
            {
                detailId: 'raise_arm',
                label: "Raise Opponent's arm",
                icon: 'info',
                ssml: "Smack the elbow up towards opponent's head. " +
                    "This exposes the armpit for a meat hook grip"
            }
        ]
    }],
    ['stockade_armraside_grab_armpit', {
        name: "Grab armpit",
        skeleton: 'stockade1',
        fromFrame: 265,
        toFrame: 290,
        transitions: ['stockade_turn_opp_away'],
        details: [
            {
                detailId: 'grab_armpit',
                label: "Grab Armpit",
                icon: 'info',
                ssml: "From cross face, the left arm is under opponent's head " +
                    "and takes a grip under opponent's armpit. " +
                    "This is similar to a meat hook. "
            }
        ]
    }],
    ['stockade_turn_opp_away', {
        name: "Turn opponent away into Stockade",
        skeleton: 'stockade1',
        fromFrame: 290,
        toFrame: 310,
        transitions: STOCKADE_TRANSITIONS,
        details: [
            {
                detailId: 'stockade',
                label: "Stockade",
                icon: 'info',
                ssml: "Now you are in the stockade position where opponent " +
                    "loses mobility of both arms and although not quite a neck crank yet " +
                    "the neck is forced forward enough to be uncomfortable"
            }
        ]
    }],
    ['stockade_entry2', {
        name: "Block far elbow (Stockade Entry)",
        skeleton: 'stockade1',
        fromFrame: 20,
        toFrame: 40,
        transitions: ['stockade_switch_hips'],
    }],
    ['stockade_switch_hips', {
        name: "Switch hips, armpit grip",
        skeleton: 'stockade1',
        fromFrame: 40,
        toFrame: 80,
        transitions: STOCKADE_TRANSITIONS,
        details: [
            {
                detailId: 'why',
                label: "Why this variation",
                icon: 'info',
                ssml: "Occasionally the opponent resists having the elbow forced towards his head, " +
                    "this is where you use your body to create more leverage to enter the stockade"
            }
        ]
    }],
    ['stockade_leg_over_near_head', {
        name: "Step leg (near head) over",
        skeleton: 'stockade1',
        fromFrame: 80,
        toFrame: 100,
        transitions: ['stockade_reverse_triangle_entry'],
        details: [
            {
                detailId: 'left_leg',
                label: "Left Leg",
                icon: 'info',
                ssml: "The leg is a more powerful replacement for the arm solidifying the position. " +
                    "This also frees up the arm for attacks"
            }
        ]
    }],
    ['stockade_reverse_triangle_entry', {
        name: "Grap own ankle",
        skeleton: 'stockade1',
        fromFrame: 100,
        toFrame: 120,
        transitions: ['reverse_triangle_fallback'],
        details: [
            {
                detailId: 'position',
                label: "Position",
                icon: 'info',
                ssml: "Grab your own left ankle and sit back. Keep left arm on the mat as base. "
            }
        ]
    }],
    ['reverse_triangle_fallback', {
        name: "Fall back",
        skeleton: 'stockade1',
        fromFrame: 140,
        toFrame: 160,
        transitions: ['reverse_triangle_make_shallow'],
        details: [
            {
                detailId: 'legs',
                label: "Legs",
                icon: 'info',
                ssml: "After falling back, the left leg would be cutting across opponent's neck. " +
                "The right left would block opponent's elbow. " +
                "However the left leg is too deep, the bend of the leg gives the carotid  artery"
            }
        ]
    }],
    ['reverse_triangle_make_shallow', {
        name: "Make triangle more shallow",
        skeleton: 'stockade1',
        fromFrame: 160,
        toFrame: 180,
        transitions: ['reverse_triangle_lockup'],
        details: [
            {
                detailId: 'make_shallow',
                label: "Make triangle shallow",
                icon: 'info',
                ssml: "The bend of the knee would give relieve to the carotid artery, " +
                    "to eliminate that gap make the leg more shallow. " +
                    "Use the right leg to push and reposition body. " +
                    "Now we should have the calf cutting deep into the opponent's carotid artery. ",
            }
        ]
    }],
    ['reverse_triangle_lockup', {
        name: "Lock up the triangle",
        skeleton: 'stockade1',
        fromFrame: 180,
        toFrame: 205,
        transitions: ['reverse_triangle_finish'],
        details: [
            {
                detailId: 'lock_up',
                label: "Lock Up the Triangle",
                icon: 'info',
                ssml: "Lock up triangle so now your right leg pushes opponent's shoulder into " +
                    "their carotid artery on the right side"
            }
        ]
    }],
    ['reverse_triangle_finish', {
        name: "Push head and finish",
        skeleton: 'stockade1',
        fromFrame: 205,
        toFrame: 235,
        transitions: [],
        details: [
            {
                detailId: 'finish',
                label: "Finish",
                icon: 'info',
                ssml: "Squeeze and push opponent's head forward. Opponent taps. " 
            }
        ]
    }],
    ['stockade_neckcrank', {
        name: "Neck Crank",
        skeleton: 'stockade1',
        fromFrame: 310,
        toFrame: 330,
        transitions: [],
        details: [
            {
                detailId: 'finish',
                label: "Finish",
                icon: 'info',
                ssml: "Twist arm so that elbow faces outwards and straighten the arm. " +
                    "This would further crank the opponent's head forward and you'll get the tap. "
            }
        ]
    }],
    ['stockade_leg_over_near_legs', {
        name: "Step leg (near legs) over",
        skeleton: 'stockade1',
        fromFrame: 350,
        toFrame: 390,
        transitions: ['stockade_knee_attack_grab_leg']
    }],
    ['stockade_knee_attack_grab_leg', {
        name: "Grab Leg",
        skeleton: 'stockade1',
        fromFrame: 390,
        toFrame: 430,
        transitions: ['stockade_knee_attack_thread_hand'],
        details: [
            {
                detailId: 'grab_leg',
                label: "Grab Leg",
                icon: 'info',
                ssml: "Use overhook to grab opponent's leg and pull it toward your own hip. " +
                    "Cup your own thigh. "
            }
        ]
    }],
    ['stockade_knee_attack_thread_hand', {
        name: "Thread the hand through",
        skeleton: 'stockade1',
        fromFrame: 430,
        toFrame: 450,
        transitions: ['stockade_knee_torque'],
        details: [
            {
                detailId: 'right_hand',
                label: "Right Hand",
                icon: 'pan_tool',
                ssml: "Thread the right hand deeper through opponent's leg and turn the hand outwards to secure the leg"
            }
        ]
    }],
    ['stockade_knee_torque', {
        name: "Finish with Knee Torque",
        skeleton: 'stockade1',
        fromFrame: 450,
        toFrame: 490,
        transitions: [],
        details: [
            {
                detailId: 'finish',
                label: "Finish",
                icon: 'info',
                ssml: "Make a fist and punch forward and outwards. Opponent taps. "
            }
        ]
    }],
]);