import { unwrap } from './proxy';

const store = new WeakMap();

const get = target => store.get(unwrap(target));
const set = (target, value) => store.set(unwrap(target), value);

export const metaSet = (target, key, val) => {
    const map = get(target) || new Map();

    map.set(key, val);
    set(target, map);
};

export const metaGet = (target, key) => {
    const map = get(target);

    return map && map.get(key);
};

export const metaDel = (target, key) => {
    const map = get(target);

    if (map) {
        map.delete(key);
    }
};
