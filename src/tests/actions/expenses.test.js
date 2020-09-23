import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, removeExpense, editExpense } from '../../actions/expenses'; 
import moment from 'moment';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

const expenses = [{ 
    id: '1',
    description: 'Gum', 
    note: '',
    amount: 195,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent', 
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card', 
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}];


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
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test('add expense to database and store',(done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Headphone',
        amount: 3000,
        note: 'New brand',
        createdAt: 1000   
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('add expense with defaults to database and store',() => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0   
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
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