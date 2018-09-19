const store = new WeakMap();
const wrappers = new WeakMap();

const unwrap = target => wrappers.get(target) || target;
const wrap = (target, wrapper) => wrappers.set(wrapper, target);

const get = target => store.get(unwrap(target));
const set = (target, value) => store.set(unwrap(target), value);

export const proxy = (C, handler) => {
    const P = new Proxy(C, handler);

    wrap(C, P);

    return P;
};

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
