import { proxy } from './proxy';
import { symbol } from './symbol';

export const callable = d => ({
    ...d,
    finisher: C =>
        proxy(C, {
            apply(target, _, args) {
                if (Reflect.has(target, callable)) {
                    return Reflect.apply(target[callable], _, args);
                } else {
                    return Reflect.construct(target, args);
                }
            },
        }),
});

symbol(callable);
