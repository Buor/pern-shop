export const generatePaginationList = (productsCount: number,currentPage: number = 1, productsPerPage = 50) => {
    const allPagesCount = Math.ceil(productsCount / productsPerPage)

    if(allPagesCount < 10 || currentPage < 5)
        return Array(allPagesCount).fill(null).map((_,i) => i+1).slice(0,9)

    if(allPagesCount - currentPage <= 4)
        return Array(9).fill(null).map((_,i) => allPagesCount-9+i+1)

    return Array(9).fill(null).map((_,i) => currentPage+(i-4))
}