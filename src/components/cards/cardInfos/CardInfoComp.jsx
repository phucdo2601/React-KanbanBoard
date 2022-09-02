import React, { useState } from "react";
import { useEffect } from "react";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import Chip from "../../chips/Chip";
import EditComp from "../../editables/EditComp";
import ModalComp from "../../modals/ModalComp";
import "./CardInfoComp.css";

const CardInfoComp = (props) => {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [activeColor, setActiveColor] = useState("");

  //   const { title, labels, tasks, date, desc } = props.card;

  //   const valueInit = {
  //     title: props.title,
  //     labels: props.labels,
  //     desc: props.desc,
  //   }

  const [values, setValues] = useState({ ...props.card });

  const caculatePercent = () => {
    if (values.tasks?.length === 0) {
      return "0";
    }

    const completed = values.tasks?.filter((item) => item.completed)?.length;

    return (completed / values.tasks?.length) * 100 + "";
  };

  const addLabel = (value, color) => {
    const index = values.labels?.findIndex((item) => item.text === value);
    if (index > -1) {
      return;
    }

    const label = {
      text: value,
      color: color,
    };

    setValues({ ...values, labels: [...values.labels, label] });
    setActiveColor("");
  };

  const removeLabel = (text) => {
    const tempLabels = values.labels?.filter((item) => item.text !== text);

    setValues({ ...values, labels: tempLabels });
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random(),
      completed: false,
      text: value,
    };

    setValues({ ...values, tasks: [...values.tasks, task] });
  };

  const removeTask = (id) => {
    const index = values.tasks?.findIndex((item) => item.id === id);
    if (index < 0) {
      return;
    }

    const tempTasks = values.tasks?.splice(index, 1);
    setValues({ ...values, tasks: tempTasks });
  };

  const updateTask = (id, completed) => {
    const index = values.tasks?.findIndex((item) => item.id === id);
    if (index < 0) {
      return;
    }

    const tempTasks = [...values.tasks];
    tempTasks[index].completed = completed;

    setValues({ ...values, tasks: tempTasks });
  };

  useEffect(() => {
    props.updateCard(props.card.id, props.boardId, values);
  }, [values]);

  return (
    <>
      <ModalComp
        onClose={() => {
          // console.log("closing");
          props.onClose();
        }}
      >
        <div className="cardinfo">
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Type />
              Title
            </div>

            <div className="cardinfo_box_body">
              <EditComp
                text={values.title}
                default={values.title}
                placeholder={"Enter title"}
                buttonText="Set Title"
                onSubmit={(value) => setValues({ ...values, title: value })}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <List />
              Description
            </div>

            <div className="cardinfo_box_body">
              <EditComp
                text={values.desc}
                default={values.desc}
                placeholder={"Enter description"}
                buttonText="Set Description"
                onSubmit={(value) => setValues({ ...values, desc: value })}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Calendar />
              Date
            </div>

            <div className="cardinfo_box_body">
              <input
                type="date"
                defaultValue={
                  values.date
                    ? new Date(values.date).toISOString().substr(0, 10)
                    : ""
                }
                onChange={(event) =>
                  setValues({ ...values, date: event.target.value })
                }
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Tag />
              Labels
            </div>

            <div className="cardinfo_box_labels">
              {values.labels?.map((item, index) => (
                <>
                  <Chip
                    close
                    onClose={() => {
                      removeLabel(item.text);
                    }}
                    key={item.text + index}
                    color={item.color}
                    text={item.text}
                  />
                </>
              ))}
            </div>

            <div className="cardinfo_box_colors">
              {colors.map((item, index) => (
                <>
                  <li
                    key={index}
                    style={{
                      backgroundColor: item,
                    }}
                    className={item === activeColor ? "active" : ""}
                    onClick={() => setActiveColor(item)}
                  />
                </>
              ))}
            </div>

            <div className="cardinfo_box_body">
              <EditComp
                text={"Add Label"}
                placeholder={"Enter Label"}
                buttonText="Add"
                onSubmit={(value) => addLabel(value, activeColor)}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <CheckSquare />
              Tasks
            </div>

            <div className="cardinfo_box_progress-bar">
              <div
                className={`cardinfo_box_progress`}
                style={{
                  width: caculatePercent() + "%",
                  backgroundColor:
                    caculatePercent() === "100" ? "limegreen" : "",
                }}
              />
            </div>

            <div className="cardinfo_box_list">
              {values.tasks?.map((item) => (
                <>
                  <div key={item.id} className="cardinfo_task">
                    <input
                      type="checkbox"
                      defaultChecked={item.completed}
                      onChange={(event) =>
                        updateTask(item.id, event.target.checked)
                      }
                    />
                    <p>{item.text}</p>
                    <Trash onClick={() => removeTask(item.id)} />
                  </div>
                </>
              ))}
            </div>

            <div className="cardinfo_box_body">
              <EditComp
                text={"Add new task"}
                placeholder={"Enter Task"}
                buttonText="Add"
                onSubmit={(value) => addTask(value)}
              />
            </div>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default CardInfoComp;
