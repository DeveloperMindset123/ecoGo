import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const changeInputValue = () => {
    const dispatch = useDispatch();  //understaind dispatch: A dispatch is a function provided by redux that allows us to send actions to redux state/hedares (similar to react state but for more complex levels of tasks). Payload represents the context/message of a certain action
    const inputValue = useSelector(state => state.sample_value)
    const handleChange = (e) => {
        dispatch({type: 'CHANGE_INPUT_VALUE', payload: e.target.value})
    }
  return (
    <input type='text' value={inputValue} onChange={handleChange} />
  )
}

//additionally, define the reducer
const initialState = {
    value: "";
}

export const sampleReducer = (state=initialState, action : any) => {
    switch(action.type) {
        case 'CHANGE_INPUT_VALUE':  //the case name needs to match what is stated above
            return {
                ...state,
                value: action.payload  //update the input value based on the user information
            }
            //other cases (define as needed)
        default:  //define the default state
            return state
    }
}


