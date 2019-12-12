import { POSITIONS } from './positions';

export const ANIMATION_CONFIG = new Map([
    ['sit_down', {
        icon: 'airline_seat_recline_normal',
        name: "Sit Down",
        skeleton: 'sitting_guard1',
        fromFrame: 60,
        toFrame: 80,
        transitions: POSITIONS.get('sitting_guard').transitions,
        highlightAvatar: 0,
        details: [
            {
                detailId: 'why',
                label: 'Why',
                ssml: "If you are new to Jiujitsu, you might be wondering why would you sit down? " +
                    "True that in real combat, this could be a dangerous position likely " +
                    "to be striked with or without weapon. But in training we often want to be in these " +
                    "positions to practise defending and indeed even attack from.",
                icon: 'help'
            },
            {
                detailId: 'elbow_positions',
                label: 'Elbow positions',
                ssml: "Keep the elbow tight to avoid rolling kimura"
            },
            {
                detailId: 'hand_positions',
                label: 'Hand positions',
                icon: 'pan_tool',
                ssml: "Hands between your chest and opponent and be ready to hand fight"
            },
            {
                detailId: 'head_positions',
                label: 'Head position',
                ssml: "Don't lean forward too much in case of guillotine"
            },
        ]
    }],
    ['pick_up_ankles', {
        name: "Pick Up Ankles",
        icon: "airline_seat_legroom_extra",
        skeleton: 'sitting_guard1',
        fromFrame: 80,
        toFrame: 100,
        transitions: ['guard_pass_grab_shins'],
        highlightAvatar: 1,
        details: [
            {
                detailId: 'why',
                label: 'Why',
                ssml: "Having opponent on his back would reduce his mobility. " +
                    "It would also make it hard for him to hand fight. " +
                    "Now we can work on the guard pass. "
            }
        ]
    }],
    ['sitting_step_forward', {
        name: "Step Forward",
        icon: "directions_walk",
        skeleton: 'idiot_sweep_legdrag_sidecontrol1',
        fromFrame: 20,
        toFrame: 40,
        transitions: ['idiot_sweep_success', 'idiot_sweep_fail'],
        details: [
            {
                detailId: 'what_happened',
                label: 'What Happened',
                ssml: "Opponent stepped too close. This is his mistake. " +
                    "You are ready to punish him with your attacks. "
            }
        ]
    }],
    ['idiot_sweep_success', {
        name: "Idiot Sweep",
        icon: "trending_down",
        skeleton: 'idiot_sweep_legdrag_sidecontrol1',
        fromFrame: 40,
        toFrame: 60,
        transitions: ['idiot_sweep_standup'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'timing',
                icon: 'access_time',
                label: 'Timing',
                ssml: "This sweep needs to be done quickly as a surprise " +
                    "as soon as opponent gets too close. "
            },
            {
                detailId: 'feet',
                label: 'Feet',
                ssml: "Create hooks with your feet to put behind your opponent's ankle. " +
                    "As you sweep widen your feet. "
            },
            {
                detailId: 'push',
                label: 'The Push',
                ssml: "Push opponent's knee as you hook your feet behind his ankle. " +
                    "He'll feel like he's falling back and naturally take a step backward, " +
                    "however your hooks impedes his motion and so he loses balance and falls. "
            },
            {
                detailId: 'after',
                label: 'After the Sweep',
                ssml: "As opponent falls, keep hold of one of his ankle so that he cannot stand back up"
            }
        ]
    }],
    ['idiot_sweep_standup', {
        name: "Stand up",
        skeleton: 'idiot_sweep_legdrag_sidecontrol1',
        fromFrame: 60,
        toFrame: 80,
        transitions: ['idiot_sweep_legdrag'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'standup',
                icon: 'accessibility',
                label: 'Stand Up',
                ssml: "To go from sitting to standing, slide a foot under your own bottom, " +
                    "come up to combat base and stand up"
            },
        ]
    }],
    ['idiot_sweep_legdrag', {
        name: "Leg Drag",
        skeleton: 'idiot_sweep_legdrag_sidecontrol1',
        fromFrame: 80,
        toFrame: 100,
        transitions: ['legdrag_sidecontrol'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'hands',
                icon: 'redo',
                label: 'Hands',
                ssml: "Pass the foot from left hand to right hand."
            },
            {
                detailId: 'drag',
                icon: 'info',
                label: 'The drag',
                ssml: "Pull opponent's leg past your own hips, " +
                    "lower yourself an make sure that your right knee " +
                    "ends up between the opponent's legs"
            },
            {
                detailId: 'pressure',
                icon: 'vertical_align_bottom',
                label: 'Pressure',
                ssml: "Apply pressure on opponent's top leg with your chest."
            }
        ]
    }],
    ['legdrag_sidecontrol', {
        name: "Side Control",
        skeleton: 'idiot_sweep_legdrag_sidecontrol1',
        fromFrame: 100,
        toFrame: 130,
        transitions: ['chair_sit'],
        swapSkeletons: ['chair_sit'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'pass_guard',
                icon: 'info',
                label: 'Pass Guard',
                ssml: "Move towards opponent's back and into side control"
            }
        ]
    }],
    ['idiot_sweep_fail', {
        name: "Idiot Sweep (Fails)",
        icon: "trending_flat",
        skeleton: 'idiot_sweep_singlex1',
        fromFrame: 40,
        toFrame: 60,
        transitions: ['shin_to_shin'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'how',
                icon: 'info',
                label: 'How',
                ssml: "Opponent may defend the sweep by bringing one foot up and over the hook, " +
                    "and base with the freed leg. "
            }
        ]
    }],
    ['shin_to_shin', {
        name: "Shin to Shin",
        skeleton: 'idiot_sweep_singlex1',
        fromFrame: 60,
        toFrame: 80,
        transitions: ['s2s_fall_to_side_lift_leg'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'shins',
                label: 'Shins',
                icon: 'info',
                ssml: "Scoot forward and as the name suggests, " +
                    "bring your own shin in contact with opponent's shin"
            },
            {
                detailId: 'left_arm',
                label: 'Left Arm',
                icon: 'info',
                ssml: "Left wraps around opponent's leg"
            },
            {
                detailId: 'right_hand',
                label: 'Right Hand',
                icon: 'pan_tool',
                ssml: "Right hand prepared to block opponent's rear leg from advancing. "
            }
        ]
    }],
    ['s2s_fall_to_side_lift_leg', {
        name: "Fall to side and Lift Leg",
        skeleton: 'idiot_sweep_singlex1',
        fromFrame: 80,
        toFrame: 115,
        transitions: ['s2s_singlex'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'shins',
                label: 'Shins',
                icon: 'info',
                ssml: "Use your shin to lift opponent's shin u pin the air"
            },
            {
                detailId: 'right_hand',
                label: 'Right Hand',
                icon: 'pan_tool',
                ssml: "It is important to keep the right hand on opponent's " +
                    "knee to stop it from stepping forward"
            },
            {
                detailId: 'off_balance',
                label: 'Off Balance',
                icon: 'info',
                ssml: "You should expect opponent to be off balance and forced " +
                    "to base with his hands. " +
                    "This is the reason why the legs becomes light and so you could lift."
            },
        ]
    }],
    ['s2s_singlex', {
        name: "Single X",
        skeleton: 'idiot_sweep_singlex1',
        fromFrame: 115,
        toFrame: 140,
        transitions: ['singlex_grab_far_ankle'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'legs',
                label: 'Legs',
                icon: 'info',
                ssml: "Left foot is in front of opponent's hip pointing outwards. " +
                    "Right foot should be behind opponent's same side buttock. " +
                    "Both legs need to pinch tight together and " +
                    "the left ankle should be putting pressure on opponent's hips"
            },
        ]
    }],
]);