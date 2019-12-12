export interface SearchEntry {
    name: string;
    subcategory: string;
    animation: string;
    animationRestriction?: object
};

export const POSITIONS = <Map<string, SearchEntry>>new Map([
    ['standing', {
        name: 'Standing',
        subcategory: 'BJJ Stance',
        animation: 'initial_bjj_stance'
    }],
    ['side_control', {
        name: 'Side Control',
        subcategory: 'Standard chest to chest',
        animation: 'sc_to_back_to_flat'
    }],
    ['singlex', {
        name: 'Single X Guard',
        subcategory: 'With overhook',
        animation: 's2s_singlex'
    }],
    ['stockade', {
        name: 'Stockade',
        subcategory: 'Standard',
        animation: 'stockade_turn_opp_away'
    }],
    ['back_mount', {
        name: 'Back Mount',
        subcategory: 'With both hooks and seat belt',
        animation: 'back_second_hook'
    }],
    ['sitting_guard', {
        name: 'Sitting Guard',
        subcategory: 'No grips',
        animation: 'sit_down'
    }],
    ['sitting_shin2shin', {
        name: 'Shin to Shin',
        subcategory: 'Sitting',
        animation: 'shin_to_shin'
    }],
    ['chair_sit', {
        name: 'Chair Sit',
        subcategory: 'From side control',
        animation: 'chair_sit'
    }],
    ['close_guard', {
        name: 'Close Guard',
        subcategory: 'Standard',
        animation: 'sc_close_guard2'
    }]
]);

export const SUBMISSIONS = <Map<string, SearchEntry>>new Map([
    ['americana', {
        name: 'Americana / Keylock',
        subcategory: 'Standard',
        animation: 'americana'
    }],
    ['kimura', {
        name: 'Kimura',
        subcategory: 'Pull dominant',
        animation: 'sc_kimura_prep'
    }],
    ['stockade_knee_torque', {
        name: 'Knee Torque',
        subcategory: 'From stockade',
        animation: 'stockade_knee_attack_grab_leg'
    }],
    ['stockade_head_crank', {
        name: 'Head Crank',
        subcategory: 'From stockade',
        animation: 'stockade_neckcrank'
    }],
    ['stockade_reverse_triangle', {
        name: 'Reverse Triangle',
        subcategory: 'From stockade',
        animation: 'stockade_reverse_triangle_entry'
    }],
    ['rear_naked_choke', {
        name: 'Rear Naked Choke',
        subcategory: 'Standard',
        animation: 'rnc_bottom_arm_under_chin'
    }],
]);

export const TAKE_DOWNS = <Map<string, SearchEntry>>new Map([
    ['double_leg', {
        name: 'Double Leg',
        subcategory: 'From side',
        animation: 'necktie_push_head'
    }],
    ['imanari', {
        name: 'Imanari Roll',
        subcategory: 'Standard',
        animation: 'initial_bjj_stance',
        animationRestriction: {
            'initial_bjj_stance': ['imanari_roll_s1']
        }
    }],
]);

export const ENTRIES = <Map<string, SearchEntry>>new Map([
    ['necktie_double_leg', {
        name: 'Double Leg',
        subcategory: 'Necktie setup',
        animation: 'initial_bjj_stance',
        animationRestriction: {
            'initial_bjj_stance': ['grab_triceps']
        }
    }],
    ['idio_sweep_shin2shin', {
        name: 'Shin to shin',
        subcategory: 'From failed idiot sweep',
        animation: 'sitting_step_forward',
        animationRestriction: {
            sitting_step_forward: ['idiot_sweep_fail']
        }
    }],
    ['shin2shin_singlex', {
        name: 'SingleX Guard',
        subcategory: 'From Shin to Shin',
        animation: 'shin_to_shin',
        animationRestriction: {
            shin_to_shin: ['s2s_fall_to_side_lift_leg']
        }
    }],
    ['stockade_fake_americana', {
        name: 'Stockade',
        subcategory: 'Fake an Americana',
        animation: 'stockade_entry1',
        animationRestriction: {
            'stockade_entry1': ['stockade_smack_elbow']
        }
    }],
    ['stockade_switch_hips', {
        name: 'Stockade',
        subcategory: 'Switch hips',
        animation: 'sc_to_back_to_flat',
        animationRestriction: {
            'sc_to_back_to_flat': ['stockade_entry2']
        }
    }],
]);

export const SWEEPS = <Map<string, SearchEntry>>new Map([
    ['idiot_sweep', {
        name: 'Idiot Sweep',
        subcategory: 'From sitting guard',
        animation: 'sitting_step_forward',
        animationRestriction: {
            'sitting_step_forward': ['idiot_sweep_success']
        }
    }],
    ['singlex_double_ankle', {
        name: 'SingleX Sweep',
        subcategory: 'Double ankle',
        animation: 's2s_singlex',
        animationRestriction: {
            's2s_singlex': ['singlex_grab_far_ankle']
        }
    }],
]);

export const GUARD_PASS = <Map<string, SearchEntry>>new Map([
    ['toreando', {
        name: 'Toreando Pass',
        subcategory: 'No Gi',
        animation: 'pick_up_ankles',
        animationRestriction: {
            'pick_up_ankles': ['guard_pass_grab_shins'],
            'guard_pass_grab_shins': ['toreando_pass']
        }
    }],
    ['leg_drag', {
        name: 'Leg Drag',
        subcategory: 'Standard',
        animation: 'idiot_sweep_standup',
        animationRestriction: {
            'idiot_sweep_standup': ['idiot_sweep_legdrag']
        }
    }],

]);

export const COUNTERS = <Map<string, SearchEntry>>new Map([
    ['sidecontrol_reguard', {
        name: 'Side Control',
        subcategory: 'Reguard to close guard',
        animation: 'sc_to_back_to_flat',
        animationRestriction: {
            'sc_to_back_to_flat': ['sc_recover_frame']
        }
    }],
    ['imanari_stepaway', {
        name: 'Imanari',
        subcategory: 'Step Away',
        animation: 'initial_bjj_stance',
        animationRestriction: {
            'initial_bjj_stance': ['imanari_roll_fail']
        }
    }],
    ['imanari_leglock_defense', {
        name: 'Imanari',
        subcategory: 'Leglock Defense',
        animation: 'imanari_roll_s3',
        animationRestriction: {
            'imanari_roll_s3': ['imanari_turn_leg']
        }
    }],
    ['back_escape', {
        name: 'Back Escape',
        subcategory: 'Slide head and shoulder to the mat',
        animation: 'back_second_hook',
        animationRestriction: {
            'back_second_hook': ['back_roll_weakside']
        }
    }]
]);