import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TodoModel } from "../models/TodoModel";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface singleTodoProp {
  index: number;
  todo: TodoModel;
  todos: Array<TodoModel>;
  setTodos: React.Dispatch<React.SetStateAction<Array<TodoModel>>>;
}

const SingleTodoComp = (props: singleTodoProp) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(props.todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    props.setTodos(
      props.todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      )
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    props.setTodos(props.todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    props.setTodos(
      props.todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <>
      <Draggable draggableId={props.todo.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, props.todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : props.todo.isDone ? (
            <s className="todos__single--text">{props.todo.todo}</s>
          ) : (
            <span className="todos__single--text">{props.todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !props.todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(props.todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(props.todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
    </>
  );
};

export default SingleTodoComp;
