import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';

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

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
      expense={expenses[2]}
    />
  );
});

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id
  });
});
