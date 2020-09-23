import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';

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

let startAddExpense, history, wrapper;

beforeEach(() => {
  startAddExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
