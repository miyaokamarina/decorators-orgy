import { Callable } from './Callable';

test('call should return an instance', () => {
    @Callable()
    class A {}

    expect(A()).toBeInstanceOf(A);
});

test.skip('@@Callable on class should expose its [[Call]] internal slot', () => {
    @Callable()
    class A {
        static [Callable]() {
            return 1488;
        }
    }

    expect(A()).toBe(A[Callable]());
    expect(A()).toBe(1488);
});

test.skip('@@Callable on instance should expose its [[Call]] internal slot', () => {
    @Callable()
    class A {
        [Callable]() {
            return 1488;
        }
    }

    const a = new A();

    expect(typeof a).toBe('function');
    expect(a).toBeInstanceOf(A);
    expect(a()).toBe(1488);
});
