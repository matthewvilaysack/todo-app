const filters = {
    searchText: '',
    hideCompleted: false,
    sortBy: 'byCreated'
}

const getFilters = () => filters

const setFilters = ({ searchText, hideCompleted, sortBy }) => {
    if (typeof searchText === 'string') {
        filters.searchText = searchText
    }
    if (typeof hideCompleted === 'boolean') {
        filters.hideCompleted = hideCompleted
    }
    if (typeof sortBy === 'string') {
        filters.sortBy = sortBy
        console.log(sortBy)
    }
}

export { setFilters, getFilters }