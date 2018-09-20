import { proxy, unwrap } from './proxy';

export const abstract = () => d => ({
    ...d,
    finisher: C =>
        proxy(C, {
            construct(T, args, NT) {
                if (unwrap(T) === unwrap(NT)) {
                    throw new TypeError('Abstract class cannot be constructed directly.');
                }

                return Reflect.construct(T, args, NT);
            },
        }),
});
