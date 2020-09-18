import { addExpense, removeExpense, editExpense } from '../../actions/expenses'; 

test('remove expense', () => {
    const action = removeExpense({ id: '123' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE', 
        id: '123'
    })
});

test('edit expense', () => {
    const action = editExpense('12', {note: 'hi'} );
    expect(action).toEqual({
        type:"EDIT_EXPENSE",
        id: '12',
        updates: {
            note: 'hi'
        }
    })
});

test('add expense with values', () => {
    const expenseData = {
        description: 'rent',
        amount: 2000,
        createdAt: 1000,
        note: 'jan rent'
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

/* test('add expense with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
});  */