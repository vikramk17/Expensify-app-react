//text_filter
export const setTextFilter = (text = '') => ({
    type: "SET_TEXT_FILTER",
    text
});

//sortByAmount
export const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});

//sortByDate
export const sortByDate = () => ({
    type: "SORT_BY_DATE"
});

//setStartDate
export const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
});

//setEndDate
export const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
});