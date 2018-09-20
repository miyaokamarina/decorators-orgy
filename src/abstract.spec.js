import { abstract } from './abstract';

test('abstract class should not be constructable', () => {
    @abstract
    class A {}

    expect(() => new A()).toThrow(TypeError);
});

test('subclass of abstract class should be constructable', () => {
    @abstract
    class A {}

    class B extends A {}

    expect(new B()).toBeInstanceOf(B);
    expect(new B()).toBeInstanceOf(A);
});
