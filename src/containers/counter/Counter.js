import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from "../../reduex/action/counter_action";

function Counter(props) {
    const dispatch = useDispatch();
    const c = useSelector(state => state.counter);

    const hanldeIncrement = () => {
        dispatch(increment());
    }

    const hanldedecrement = () => {
        dispatch(decrement());
    }

    return (
        <div>
            <Button onClick={() => hanldeIncrement()}>+</Button>
            {c.counter}
            <Button onClick={() => hanldedecrement()}>-</Button>
        </div>
    );
}

export default Counter;