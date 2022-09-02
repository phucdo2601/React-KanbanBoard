import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import "./Card.css";
import Chip from "./../chips/Chip";
import DropdownComp from "../dropdowns/DropdownComp";
import CardInfoComp from "./cardInfos/CardInfoComp";

const Card = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <>
          <CardInfoComp
            updateCard={props.updateCard}
            boardId={props.boardId}
            card={props.card}
            onClose={() => {
              // console.log("calling");
              setShowModal(false);
            }}
          />
        </>
      )}

      <div
        className="card"
        draggable
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {props.card?.labels?.map((item, index) => (
              <>
                <Chip key={index} text={item.text} color={item.color} />
              </>
            ))}
          </div>

          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown === true && (
              <>
                <DropdownComp onClose={() => setShowDropdown(false)}>
                  <div className="card_dropdown">
                    <p
                      onClick={() =>
                        props.removeCard(props.card?.id, props.boardId)
                      }
                    >
                      Delete Card
                    </p>
                  </div>
                </DropdownComp>
              </>
            )}
          </div>
        </div>

        <div className="card_title">{props.card?.title}</div>

        <div className="card_footer">
          {props.card?.date && (
            <>
              <p>
                <Clock /> {props.card?.date}
              </p>
            </>
          )}

          {props.card?.tasks?.length > 0 && (
            <>
              <p>
                <CheckSquare />
                {props.card?.tasks?.filter((item) => item.completed).length}/
                {props.card?.tasks?.length}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
