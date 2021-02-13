import { toInt } from './toInt'

export const strToArrayInt = (s, separator) => {
    const delimiter = separator || ','
    return s.split(delimiter).map(item => toInt(item))
}