export const POSITIONS = new Map([
    ['side_control', {
        transitions: ['sc_recover_frame', 'sc_kimura_prep', 'sc_turn_away', 'stockade_entry1', 'stockade_entry2']
    }],
    ['sc_uke_looks_away', {
        transitions: ['sc_to_back_to_flat', 'chair_sit']
    }],
    ['sitting_guard', {
        transitions: ['sitting_step_forward','pick_up_ankles']
    }]
])