import * as ENGAGEMENT from './engagement';
import * as SITTING_GUARD from './sitting_guard';
import * as TOREANDO_PASS from './toreando_pass';
import * as BACK_TAKE from './back_take';
import * as TAKEDOWNS from './takedowns';
import * as SINGLEX from './singlex';
import * as SIDECONTROL from './side-control';
import * as STOCKADE from './stockade';
import * as AMERICANA from './americana';
import * as CLOSE_GUARD  from './close-guard';
import * as IMANARI  from './imanari';
import * as SEARCH  from './search';
import {SearchEntry} from './search';

const SUB_CONFIGS = [
    ENGAGEMENT,
    SITTING_GUARD,
    TOREANDO_PASS,
    BACK_TAKE,
    TAKEDOWNS,
    SINGLEX,
    SIDECONTROL,
    STOCKADE,
    AMERICANA,
    CLOSE_GUARD,
    IMANARI
];

var SKELETONS_TO_LOAD = new Set();

SUB_CONFIGS.forEach(cfg=>{
    cfg.ANIMATION_CONFIG.forEach(c=>{
        SKELETONS_TO_LOAD.add(c.skeleton);
    })
});

export const INIT_ACTION = 'initial_bjj_stance'

var ANIMATION_CONFIG = new Map();

SUB_CONFIGS.forEach((sub_config: any) => {
    sub_config.ANIMATION_CONFIG.forEach((v: object, k: string) => {
        v['animationId'] = k;
        ANIMATION_CONFIG.set(k, v);
    })
});

var ANIMATION_SEARCH = new Map();

const _SEARCH_TYPES = [
  ['POSITIONS', SEARCH.POSITIONS],
  ['SUBMISSIONS', SEARCH.SUBMISSIONS],
  ['TAKE_DOWNS', SEARCH.TAKE_DOWNS],
  ['ENTRIES', SEARCH.ENTRIES],
  ['SWEEPS', SEARCH.SWEEPS],
  ['GUARD_PASS', SEARCH.GUARD_PASS],
  ['COUNTERS', SEARCH.COUNTERS]
];

_SEARCH_TYPES.forEach((sub_config: any) => {
    sub_config[1].forEach((v: object, k: string) => {
        v['searchId'] = k;
        let cfg_name = sub_config[0];
        if(!ANIMATION_SEARCH.has(cfg_name)) {
            ANIMATION_SEARCH.set(cfg_name, []);
        }
        ANIMATION_SEARCH.get(cfg_name).push(v);
    })
});

export function getTransitions(animation, animationRestriction?: object) {
    var transitions = animation.transitions;
    if(animationRestriction) {
        var restrictions = animationRestriction[animation.animationId];
        if(restrictions) {
            transitions = restrictions
        }
    }
    return transitions.map(t=>ANIMATION_CONFIG.get(t));
}


export { ANIMATION_CONFIG, SKELETONS_TO_LOAD, ANIMATION_SEARCH, SearchEntry};