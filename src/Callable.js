import { proxy } from './proxy';
import { symbol } from './symbol';
import { mimic } from './mimic';

export const Callable = () => d => ({
    ...d,
    finisher: C =>
        proxy(C, {
            apply(T, _, args) {
                if (Reflect.has(T, Callable)) {
                    return Reflect.apply(T[Callable], _, args);
                } else {
                    return Reflect.construct(T, args);
                }
            },
            construct(T, args, NT) {
                const instance = Reflect.construct(T, args, NT);

                if (!Reflect.has(instance, Callable)) {
                    return instance;
                }

                const caller = mimic(instance[Callable], function (...args) {
                    return Reflect.apply(instance[Callable], this, args);
                });

                Reflect.setPrototypeOf(caller, instance);

                return caller;
            }
        }),
});

symbol(Callable);
