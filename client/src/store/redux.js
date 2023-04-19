import { createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {
    switch ( action.type ) {
        case 'increment':
            return {
                counter: state.counter + 1
            }
    }
    
    return state;
}

const store = createStore(counterReducer)//point in that function

export default store;