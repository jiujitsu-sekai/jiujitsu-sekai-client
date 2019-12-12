export const ANIMATION_CONFIG = new Map([
    ['singlex_grab_far_ankle', {
        name: "Grab Farside Ankle",
        skeleton: 'idiot_sweep_singlex1',
        fromFrame: 140,
        toFrame: 150,
        transitions: ['singlex_sweep'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'ankles',
                label: 'Ankles',
                ssml: "With both ankles tied, opponent would not be able to base when swept",
                icon: 'info'
            },
        ]
    }],
    ['singlex_sweep', {
        name: "Sweep",
        skeleton: 'idiot_sweep_singlex1',
        fromFrame: 150,
        toFrame: 190,
        transitions: ['toreando_pass'],
        swapSkeletons: ['toreando_pass'],
        highlightAvatar: 0,
        details: [
            {
                detailId: 'legs',
                label: 'Legs',
                ssml: "Keep pinching opponent's thigh",
                icon: 'info'
            },
            {
                detailId: 'hips',
                label: 'Hips',
                ssml: "Hips shoot up and then twist",
                icon: 'info'
            },
            {
                detailId: 'hands',
                label: 'Hands',
                ssml: "Pull on opponent's ankle",
                icon: 'info'
            },
            {
                detailId: 'finishing',
                label: 'Finishing the sweep',
                ssml: "Keep opponent's foot off the floor so he cannot stand up. " + 
                    "Sit up to combat base to avoid opponent closing guard on you. ",
                icon: 'info'
            },
            {
                detailId: 'ibjjf_points',
                label: 'IBJJF Points',
                ssml: "If fighting under IBJJF rule, this sweep would score 2 points",
                icon: 'exposure_plus_2'
            }
        ]
    }],
]);