import { POSITIONS } from './positions';

export const ANIMATION_CONFIG = new Map([
    ['guard_pass_grab_shins', {
        name: "Grab Shins",
        skeleton: 'toreando_pass1',
        fromFrame: 20,
        toFrame: 40,
        transitions: ['toreando_pass'],
        details: [
            {
                detailId: 'grab_shins',
                label: "Grab Shins",
                icon: 'pan_tool',
                ssml: "Grab shins to control opponent's legs. " +
                    "This really is a Gi technique where you grab the pants. "
            }
        ]
    }],
    ['toreando_pass', {
        name: "Toreando Pass",
        skeleton: 'toreando_pass1',
        fromFrame: 40,
        toFrame: 60,
        transitions: ['tp_drive_shoulder_down'],
        details: [
            {
                detailId: 'toreando_pass',
                label: "Toreando Pass",
                icon: 'info',
                ssml: "Left arm pull to straighten opponent's leg " +
                    "and right arm pushes opponent's knee away. " +
                    "At the same time step around. "
            }
        ]
    }],
    ['tp_drive_shoulder_down', {
        name: "Drive Shoulder Down",
        skeleton: 'toreando_pass1',
        fromFrame: 60,
        toFrame: 80,
        transitions: ['tp_side_control'],
        details: [
            {
                detailId: 'shoulder',
                label: "Shoulder",
                icon: 'vertical_align_bottom',
                ssml: "Drive left shoulder down onto opponent's belly"
            }
        ]
    }],
    ['tp_side_control', {
        name: "Side Control",
        skeleton: 'toreando_pass1',
        fromFrame: 80,
        toFrame: 100,
        transitions: POSITIONS.get('sc_uke_looks_away').transitions,
        details: [
            {
                detailId: 'exposing_back',
                label: "Exposing the back",
                icon: 'info',
                ssml: "After the pass, you will end up in side control. " +
                    "Also likely to have opponent facing away. " +
                    "Now the back is exposed for further attacks. "
            }
        ]
    }],
]);