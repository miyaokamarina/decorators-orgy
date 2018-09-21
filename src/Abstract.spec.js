import { Abstract } from './Abstract';

test('abstract class should not be constructable', () => {
    @Abstract()
    class A {}

    expect(() => new A()).toThrow(TypeError);
});

test('subclass of abstract class should be constructable', () => {
    @Abstract()
    class A {}

    class B extends A {}

    expect(new B()).toBeInstanceOf(B);
    expect(new B()).toBeInstanceOf(A);
});

test('abstract method call should throw', () => {
    class A {
        @Abstract()
        f() {}
    }

    const a = new A();

    expect(() => {
        a.f();
    }).toThrow(TypeError);
});
