const proxies = new WeakMap();

export const unwrap = target => proxies.get(target) || target;
export const wrap = (target, wrapper) => void proxies.set(wrapper, target);

export const proxy = (C, handler) => {
    const P = new Proxy(C, handler);

    wrap(C, P);

    return P;
};
