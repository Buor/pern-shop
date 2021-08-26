import { generatePaginationList } from './generatePaginationList'
describe("Testing generatePaginationList function", () => {
    it('start check', () => {
        expect(generatePaginationList(1024,2).toString()).toBe([1,2,3,4,5,6,7,8,9].toString())
    })
    it('middle check 1', () => {
        expect(generatePaginationList(1024,13).toString()).toBe([9,10,11,12,13,14,15,16,17].toString())
    })
    it('middle check 2', () => {
        expect(generatePaginationList(2015,8).toString()).toBe([4,5,6,7,8,9,10,11,12].toString())
    })
    it('few pages check', () => {
        expect(generatePaginationList(107,3).toString()).toBe([1,2,3].toString())
    })
    it('empty check', () => {
        expect(generatePaginationList(21,1).toString()).toBe([].toString())
    })
})
