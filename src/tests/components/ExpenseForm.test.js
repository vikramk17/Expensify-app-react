import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';

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


test('should render ExpenseForm', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense form with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should change description on input change',() => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change',{
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should note on textarea change',() => {
    const value = 'New note value';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change',{
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input',() => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input',() => {
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target: { value }
    });
    expect(wrapper.state('description')).toBe('');
});

test('should call onsubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[1].description,
        note: expenses[1].note,
        amount: expenses[1].amount,
        createdAt: expenses[1].createdAt
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should change calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toEqual(focused);
})