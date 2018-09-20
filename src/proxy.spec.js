import { wrap, unwrap, proxy } from './proxy';

test('`wrap` and `unwrap` should wrap and unwrap', () => {
    const a = {};
    const b = {};

    wrap(a, b);

    expect(b).not.toBe(a);
    expect(unwrap(b)).toBe(a);
});

test('proxied object should be unwrapped to the original', () => {
    const a = {};
    const b = proxy(a, {});

    expect(b).not.toBe(a);
    expect(unwrap(b)).toBe(a);
});
