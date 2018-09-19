export const callable = d => ({
    ...d,
    finisher: C => new Proxy(C, { apply: (target, _, args) => Reflect.construct(C, args) }),
});
