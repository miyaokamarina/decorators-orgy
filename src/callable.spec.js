import { callable } from './callable';

test('call should return an instance', () => {
    @callable()
    class A {}

    expect(A()).toBeInstanceOf(A);
});

test.skip('@@callable on class should expose its [[Call]] internal slot', () => {
    @callable()
    class A {
        static [callable]() {
            return 1488;
        }
    }

    expect(A()).toBe(A[callable]());
    expect(A()).toBe(1488);
});

test.skip('@@callable on instance should expose its [[Call]] internal slot', () => {
    @callable()
    class A {
        [callable]() {
            return 1488;
        }
    }

    const a = new A();

    expect(typeof a).toBe('function');
    expect(a).toBeInstanceOf(A);
    expect(a()).toBe(1488);
});
