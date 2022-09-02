import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { TodoModel } from "../models/TodoModel";
import SingleTodoComp from "./SingleTodoComp";

interface TodoListProps {
  todos: Array<TodoModel>;
  setTodos: React.Dispatch<React.SetStateAction<Array<TodoModel>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<TodoModel>>>;
  CompletedTodos: Array<TodoModel>;
}

const TodoListComp = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}: TodoListProps) => {
  return (
    
      <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodoComp
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {CompletedTodos?.map((todo, index) => (
              <SingleTodoComp
                index={index}
                todos={CompletedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
    
  );
};

export default TodoListComp;
