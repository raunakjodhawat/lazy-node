type ExpendRecursivelyTypeFunction<T> = T extends object
? T extends infer O ? { [K in keyof O]: ExpendRecursivelyTypeFunction<O[K]> } : never
: T;

export {
    ExpendRecursivelyTypeFunction
}