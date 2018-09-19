export const symbol = f => {
    const s = Symbol(f.name);

    Reflect.defineProperty(f, Symbol.toPrimitive, { value: () => s });
};
