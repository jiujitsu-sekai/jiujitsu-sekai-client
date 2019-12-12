export const ANIMATION_CONFIG = new Map([
    ['sc_recover_frame', {
        name: "Recover Frame",
        skeleton: 'close_guard1',
        fromFrame: 20,
        toFrame: 50,
        transitions: ['sc_hip_escape'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'left_arm',
                label: 'Left Arm',
                ssml: "Bring left forearm in front of opponent's neck to create a frame. " + 
                    "He will find that it chokes him if he tries to drive his weight down on you.",
                icon: 'pan'
            },
            {
                detailId: 'right_arm',
                label: 'Right Arm',
                ssml: "Frame with the right arm on opponent's hip to create distance. " +
                    "Use the blade of the hand and not the palm or opponent can twist and ends up with wrist lock.",
                icon: 'pan'
            }
        ]
    }],
    ['sc_hip_escape', {
        name: "Hip Escape",
        skeleton: 'close_guard1',
        fromFrame: 50,
        toFrame: 70,
        transitions: ['sc_close_guard1'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'hip',
                label: 'Hips',
                ssml: "Hip escape to bring your hip as far from the opponent as possible."
            },
        ]
    }],
    ['sc_close_guard1', {
        name: "Close Guard (Step 1)",
        skeleton: 'close_guard1',
        fromFrame: 70,
        toFrame: 90,
        transitions: ['sc_close_guard2'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'left_leg',
                label: 'Left Leg',
                ssml: "Left Leg clamps around opponent's back."
            }
        ]
    }],
    ['sc_close_guard2', {
        name: "Close Guard (Step 2)",
        skeleton: 'close_guard1',
        fromFrame: 90,
        toFrame: 120,
        transitions: [],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'right_leg',
                label: 'Right Leg',
                ssml: "Take right leg out and recover guard."
            },
            {
                detailId: 'body',
                label: 'Body Position',
                ssml: "You would want to square up to face your opponent to create space for the leg to come out"
            }
        ]
    }]
]);