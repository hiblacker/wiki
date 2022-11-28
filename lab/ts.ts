type GetRequire<Obj extends Record<string, any>> = {
    [Key in keyof Obj as isRequired<Obj,  Key>]: Obj[Key]
}
type isRequired<Obj, Key extends keyof Obj> = {} extends Pick<Obj, Key> ? never : Key

type i = GetRequire<{ a: number; b?: string }>

// type a = {
//     [a1: never]: string
// }

type GetOptional<Obj extends Record<string, any>> = {
    [Key in keyof Obj as GetOptionalKey<Obj, Key>]: Obj[Key]
}

type GetOptionalKey<Obj, Key extends keyof Obj> = {} extends Pick<Obj, Key> ? Key : never

type i2 = GetOptional<{ a: number; b?: string }>

type i3 = {
    [Key in 'a' | 'b' as 'never']:string
}
