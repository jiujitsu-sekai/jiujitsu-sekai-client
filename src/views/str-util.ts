export function allCapsToTitle(s) {
    return s[0] + s.substr(1).toLowerCase().replace('_', ' ');
}