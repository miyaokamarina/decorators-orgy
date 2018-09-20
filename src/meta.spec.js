import { metaSet, metaGet, metaDel } from './meta';
import { proxy } from './proxy';

class C {}

const o = new C();
const p = proxy(o, {});

test('proxied object should have different link', () => {
    expect(p).not.toBe(o);
});

test('the same metadata should be accessible on both objects', () => {
    const k1 = Symbol();
    const k2 = Symbol();
    const v1 = {};
    const v2 = {};

    metaSet(p, k1, v1);
    metaSet(o, k2, v2);

    expect(metaGet(o, k1)).toBe(v1);
    expect(metaGet(p, k2)).toBe(v2);
});

test('deleted metadata should not be accessible', () => {
    const k = Symbol();
    const v = {};

    metaSet(o, k, v);
    metaDel(o, k);

    expect(metaGet(o, k)).toBeUndefined();
});
