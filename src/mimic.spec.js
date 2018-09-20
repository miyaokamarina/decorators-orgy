import { mimic } from './mimic';

test('`@@toSource` should work', () => {
    const f = () => 'f';
    const g = () => 'g';

    g[Symbol.toSource] = () => String(f);

    expect(Function.prototype.toString.call(g)).toBe(Function.prototype.toString.call(f));
    expect(String(g)).toBe(String(f));
});

test('`mimic` should mimic', () => {
    const log = [];
    const hof = f =>
        mimic(f, function(...args) {
            const result = Reflect.apply(f, this, args);

            log.push([args, result]);

            return result;
        });

    const f = (a, b) => a + b;

    f.a = {};

    const g = hof(f);

    g(1, 2);

    expect(String(g)).toBe(String(f));
    expect(g.a).toBe(f.a);
    expect(g.name).toBe(f.name);
    expect(g.length).toBe(f.length);
    expect(log).toEqual([[[1, 2], 3]]);
});
