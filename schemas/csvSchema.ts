import {z} from 'zod'
const csvObject=
    z.object({
        name:z.string({required_error:'name needed'}),
        age:z.coerce.number({required_error:'age needed'}),
        subjectId:z.coerce.number({required_error:'subjectid needed'})
    })
export  default z.array(csvObject)