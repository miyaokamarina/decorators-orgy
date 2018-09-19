import { symbol } from './symbol';

test('functions and classes with symbols should be a valid property keys', () => {
    const f1 = function f() {};
    const f2 = function f() {};

    const C1 = class C {};
    const C2 = class C {};

    symbol(f1);
    symbol(f2);
    symbol(C1);
    symbol(C2);

    class C {
        [f1] = 'a';
        [f2] = 'b';
        [C1] = 'c';
        [C2] = 'd';
    }

    const o = new C();

    expect(o[f1]).toBe('a');
    expect(o[f2]).toBe('b');
    expect(o[C1]).toBe('c');
    expect(o[C2]).toBe('d');
});
