import { store } from "../redux/store";
import { NO_HIGHLIGHT_AVATAR } from "../animation-config/highlight";

var _swapSkeletonNames = [];
var _swapSkeletonHistory = [false];
export var swapSkeletons = false;

/*
// TODO: When rewinding undo the swap skeleton
function handleAction() {
    var animationHistory = store.getState().animationHistory;
    if(animationHistory.length < _swapSkeletonHistory.length) {
        var i = animationHistory.length - 1;
        if(_swapSkeletonHistory[i] != _swapSkeletonHistory[i-1]) {
            swapSkeletons = !swapSkeletons;
            console.log([_swapSkeletonHistory[i], _swapSkeletonHistory[i-1]])
            console.log(animationHistory);
            console.log(_swapSkeletonHistory);
            _swapSkeletonHistory = _swapSkeletonHistory.splice(animationHistory.length);
        }
    }
}
*/

export function swapSkeletonIfNeeded(actionName: string, swapSkeletonName: Array<string>) {
    if(_swapSkeletonNames.indexOf(actionName) != -1) {
        swapSkeletons = !swapSkeletons;
        //TODO: No longer need to maintain this in app status
        //store.dispatch(setSwapSkeleton(_swapSkeletons))
    }
    _swapSkeletonNames = swapSkeletonName;
    _swapSkeletonHistory.push(swapSkeletons);
}

export function getSkeletonNum(n: number): number {
    /**
     * If there is a swap skeleton, then swap the number
     */
    if(n == NO_HIGHLIGHT_AVATAR) return n;
    return swapSkeletons ? (n + 1) % 2 : n;
}

//store.subscribe(handleAction);