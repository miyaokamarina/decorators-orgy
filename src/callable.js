import { proxy } from './proxy';
import { symbol } from './symbol';
import { mimic } from './mimic';

export const callable = () => d => ({
    ...d,
    finisher: C =>
        proxy(C, {
            apply(T, _, args) {
                if (Reflect.has(T, callable)) {
                    return Reflect.apply(T[callable], _, args);
                } else {
                    return Reflect.construct(T, args);
                }
            },
            construct(T, args, NT) {
                const instance = Reflect.construct(T, args, NT);

                if (!Reflect.has(instance, callable)) {
                    return instance;
                }

                const caller = mimic(instance[callable], function (...args) {
                    return Reflect.apply(instance[callable], this, args);
                });

                Reflect.setPrototypeOf(caller, instance);

                return caller;
            }
        }),
});

symbol(callable);
