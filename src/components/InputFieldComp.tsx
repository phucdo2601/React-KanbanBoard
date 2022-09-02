import React, { useRef } from 'react';
import './styles.css'

interface inputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputFieldComp = (props : inputFieldProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        props.handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={props.todo}
        ref={inputRef}
        onChange={(e) => props.setTodo(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  );
}

export default InputFieldComp