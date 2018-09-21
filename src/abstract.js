import { proxy, unwrap } from './proxy';

export const abstract = () => d => {
    if (d.kind === 'class') {
        return {
            ...d,
            finisher: C =>
                proxy(C, {
                    construct(T, args, NT) {
                        if (unwrap(T) === unwrap(NT)) {
                            throw new TypeError('Class not implemented.');
                        }

                        return Reflect.construct(T, args, NT);
                    },
                }),
        };
    }

    if (d.kind === 'method') {
        return {
            ...d,
            descriptor: {
                ...d.descriptor,
                value() {
                    throw new TypeError('Method not implemented.');
                }
            },
        };
    }

    return d;
};

@abstract()
class A {
    @abstract()
    f() {
        return 1488;
    }
}
