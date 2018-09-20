import { callable } from './callable';

test('call should return an instance', () => {
    @callable
    class A {}

    expect(A()).toBeInstanceOf(A);
});

test('@@callable should expose [[Apply]] internal slot', () => {
    @callable
    class A {
        static [callable]() {
            return 1488;
        }
    }

    // expect(A()).toBe(A[callable]());
    // expect(A()).toBe(1488);
});
