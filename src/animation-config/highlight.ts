export const NO_HIGHLIGHT_AVATAR = -1;
export const DEFAULT_HIGHLIGHT_AVATAR = 1;

export function getHighlightAvatar(n: number) {
    if(n == NO_HIGHLIGHT_AVATAR) {
        return n;
    }
    return typeof n == 'undefined' ? DEFAULT_HIGHLIGHT_AVATAR : n;
}