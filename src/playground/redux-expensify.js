import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//Add_expense
const addExpense = ({description='', note='', amount = 0, createdAt = 0  }) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//remove_expense
const removeExpense = ({id}) => ({
    type: "REMOVE_EXPENSE",
    id
});

//edit_Expense
const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
})


//Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case "ADD_EXPENSE": {
            return [...state, action.expense]
        }
        case "REMOVE_EXPENSE": {
            return state.filter(({id})=>id !== action.id); 
        }
        case "EDIT_EXPENSE": {
            return state.map((expense)=>{
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }else {
                    expense
                }
            })
        }
        default: return state;
    }
};

//text_filter
const setTextFilter = (text = '') => ({
    type: "SET_TEXT_FILTER",
    text
});

//sortByAmount
const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});

//sortByDate
const sortByDate = () => ({
    type: "SORT_BY_DATE"
});

//setStartDate
const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
});

//setEndDate
const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
});
    
//Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case "SET_TEXT_FILTER": {
            return{
                ...state,
                text: action.text
            }
        }
        case "SORT_BY_AMOUNT": {
            return{
                ...state,
                sortBy: 'amount'
            }
        }
        case "SORT_BY_DATE": {
            return{
                ...state,
                sortBy: 'date'
            }
        }
        case "SET_START_DATE":{
            return{
                ...state,
                startDate: action.startDate
            }
        }
        case "SET_END_DATE": {
            return{
                ...state,
                endDate: action.endDate
            }
        }
        default: return state;
    }
};

//get visible expenses 
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate ;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate ;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) ;

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b)=>{
        if( sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if( sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    })
}

const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: -91000})); 
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 200}));

// store.dispatch(setTextFilter('Rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = { 
    expenses: [{
        id: 'sdf',
        description: 'Monthly rent',
        note: 'This is the Jan month rent',
        amount: 43110,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
}

