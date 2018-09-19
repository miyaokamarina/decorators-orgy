import { callable } from './callable';

test('call should return an instance', () => {
    @callable
    class A {}

    expect(A()).toBeInstanceOf(A);
});
