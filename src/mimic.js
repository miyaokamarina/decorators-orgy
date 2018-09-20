// HACK: じゃあ、JavaScriptの皆さん、ビルトインメソードオーバーライドですか？

const mappings = new WeakMap();

// Add the `Symbol.toSource` symbol:
Reflect.defineProperty(Symbol, 'toSource', {
    ...Reflect.getOwnPropertyDescriptor(Symbol, 'toPrimitive'),
    value: Symbol('toSource'),
});

// Backup original method:
const original = Function.prototype.toString;

// Define patched method:
const patched = function toString() {
    // Check `@@toSource` method:
    if (Reflect.has(this, Symbol.toSource)) {
        return Reflect.apply(this[Symbol.toSource], this, []);
    }

    // Check if function has its mapped original:
    if (mappings.has(this)) {
        return Reflect.apply(original, mappings.get(this), []);
    }

    return Reflect.apply(original, this, []);
};

// Mimic original:
mappings.set(patched, original);

// Update `Function`'s method:
Reflect.defineProperty(Function.prototype, 'toString', {
    ...Reflect.getOwnPropertyDescriptor(Function.prototype, 'toString'),
    value: patched,
});

export const mimic = (f, g) => {
    mappings.set(g, f);

    Reflect.setPrototypeOf(g, f);

    Reflect.defineProperty(g, 'name', Reflect.getOwnPropertyDescriptor(f, 'name'));
    Reflect.defineProperty(g, 'length', Reflect.getOwnPropertyDescriptor(f, 'length'));

    return g;
};
