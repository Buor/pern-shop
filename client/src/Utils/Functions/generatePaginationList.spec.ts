//@ts-ignore
import { generatePaginationList } from './generatePaginationList'

it('should equal [1,2,3,4,5,6,7,8,9]', () => {
    expect(generatePaginationList(255,2).toString()).toBe([1,2,3,4,5,6,7,8,9].toString())
})
