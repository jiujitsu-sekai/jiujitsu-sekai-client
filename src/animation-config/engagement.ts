import {NO_HIGHLIGHT_AVATAR} from './highlight';

export const ANIMATION_CONFIG = new Map([
    ['initial_bjj_stance', {
        name: "BJJ Fighting Stance",
        skeleton: 'sitting_guard1',
        fromFrame: 40,
        toFrame: 60,
        transitions: ['sit_down', 'grab_triceps', 'imanari_roll_fail', 'imanari_roll_s1'],
        highlightAvatar: NO_HIGHLIGHT_AVATAR,
        details: [
            {
                detailId: 'the_stance',
                label: 'The stance',
                ssml: "Low stance to avoid easy double or single leg takedowns. " +
                    "Of course there are many ways to stand. This position is merely a starting point for you to explore your jiujitsu.",
                icon: 'info'
            },
        ]
    }],
]);