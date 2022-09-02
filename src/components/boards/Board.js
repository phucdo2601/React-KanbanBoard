import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../cards/Card";
import DropdownComp from "../dropdowns/DropdownComp";
import EditComp from "../editables/EditComp";
import "./Board.css";

const Board = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <div className="board">
        <div className="board_top">
          <p className="board_top_title">
            {props.board.title} <span>{`${props.board?.cards?.length}`}</span>
          </p>

          <div className="board_top_more" onClick={(event)=>{
            event.stopPropagation();
            setShowDropdown(true)
            }}>
            <MoreHorizontal />
            {showDropdown === true && (
              <>
                <DropdownComp onClose={() => setShowDropdown(false)}>
                  <div className="board_dropdown">
                    <p onClick={() => props.removeBoard(props.board?.id)}>Delete Board</p>
                  </div>
                </DropdownComp>
              </>
            )}
          </div>
        </div>
        <div className="board_cards custom-scroll">

            {
              props.board?.cards?.map((item) => (
                <>
                  <Card 
                    key={item.id}
                    card={item}
                    removeCard={props.removeCard}
                    boardId={props.board?.id}
                    handleDragEnd={props.handleDragEnd}
                    handleDragEnter={props.handleDragEnter}
                    updateCard={props.updateCard}
                  />
                </>
              ))
            }

          <EditComp
            displayClass="boards_cards_add"
            text="Add Card"
            placeholder="Enter Card Title"
            onSubmit={(value)=>props.addCard(value, props.board?.id)}
          />
        </div>
      </div>
    </>
  );
};

export default Board;
