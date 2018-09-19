import { proxy } from './meta';

export const callable = d => ({
    ...d,
    finisher: C => proxy(C, { apply: (target, _, args) => Reflect.construct(C, args) }),
});
