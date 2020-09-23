import uuid from 'uuid';
import database from '../firebase/firebase';

//Add_expense
export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense
});

export const startAddExpense = (expenseData = {}) => {
    const {description='', note='', amount = 0, createdAt = 0} = expenseData;
    return (dispatch) => {
        const expense = {description,note,amount,createdAt};

        return database.ref('expenses').push(expense).then((ref)=>{
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });        
    };
};

//remove_expense
export const removeExpense = ({id}) => ({
    type: "REMOVE_EXPENSE",
    id
});

//edit_Expense
export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
})
