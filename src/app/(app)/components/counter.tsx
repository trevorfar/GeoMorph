"use client"
// components/Counter.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../GlobalRedux/Features/hooks';
import { increment, decrement, incrementByAmount } from '../GlobalRedux/Features/Counter/counterSlice';

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(decrement(1))}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment(1))}>+</button>
      </div>
      <button onClick={() => dispatch(incrementByAmount(4))}>Increment by 2</button>
    </div>
  );
};

export default Counter;
