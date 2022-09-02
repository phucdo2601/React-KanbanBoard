import React, { useEffect, useState } from 'react'
import Board from '../../Components/Board/Board';
import Editable from '../../Components/Editabled/Editable';
import './KanbanDashboardPage.css'

const KanbanDashboardPage = () => {
    const [boards, setBoards] = useState<Array<any>>(
        JSON.parse(localStorage.getItem("prac-kanban") as any) || []
      );
    
      const [targetCard, setTargetCard] = useState({
        bid: "",
        cid: "",
      });
    
      const addboardHandler = (name: any) => {
        const tempBoards = [...boards];
        tempBoards.push({
          id: Date.now() + Math.random() * 2,
          title: name,
          cards: [],
        });
        setBoards(tempBoards);
      };
    
      const removeBoard = (id: any) => {
        const index = boards.findIndex((item: any) => item.id === id);
        if (index < 0) return;
    
        const tempBoards = [...boards];
        tempBoards.splice(index, 1);
        setBoards(tempBoards);
      };
    
      const addCardHandler = (id: any, title: any) => {
        const index = boards.findIndex((item: any) => item.id === id);
        if (index < 0) return;
    
        const tempBoards = [...boards];
        tempBoards[index].cards.push({
          id: Date.now() + Math.random() * 2,
          title,
          labels: [],
          date: "",
          tasks: [],
        });
        setBoards(tempBoards);
      };
    
      const removeCard = (bid: any, cid: any) => {
        const index = boards.findIndex((item: any) => item.id === bid);
        if (index < 0) return;
    
        const tempBoards = [...boards];
        const cards = tempBoards[index].cards;
    
        const cardIndex = cards.findIndex((item: any) => item.id === cid);
        if (cardIndex < 0) return;
    
        cards.splice(cardIndex, 1);
        setBoards(tempBoards);
      };
    
      const dragEnded = (bid: any, cid: any) => {
        let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
        s_boardIndex = boards.findIndex((item: any) => item.id === bid);
        if (s_boardIndex < 0) return;
    
        s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
          (item: any) => item.id === cid
        );
        if (s_cardIndex < 0) return;
    
        t_boardIndex = boards.findIndex((item: any) => item.id === targetCard.bid);
        if (t_boardIndex < 0) return;
    
        t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
          (item: any) => item.id === targetCard.cid
        );
        if (t_cardIndex < 0) return;
    
        const tempBoards = [...boards];
        const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
        tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
        tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
        setBoards(tempBoards);
    
        setTargetCard({
          bid: "",
          cid: "",
        });
      };
    
      const dragEntered = (bid: any, cid: any) => {
        if (targetCard.cid === cid) return;
        setTargetCard({
          bid,
          cid,
        });
      };
    
      const updateCard = (bid: any, cid: any, card: any) => {
        const index = boards.findIndex((item: any) => item.id === bid);
        if (index < 0) return;
    
        const tempBoards = [...boards];
        const cards = tempBoards[index].cards;
    
        const cardIndex = cards.findIndex((item: any) => item.id === cid);
        if (cardIndex < 0) return;
    
        tempBoards[index].cards[cardIndex] = card;
    
        setBoards(tempBoards);
      };
    
      useEffect(() => {
        localStorage.setItem("prac-kanban", JSON.stringify(boards));
      }, [boards]);
    
      return (
        <>
          <div className="app">
          <div className="app_nav">
            <h1>Kanban Board</h1>
          </div>
          <div className="app_boards_container">
            <div className="app_boards">
              {boards.map((item: any) => (
                <Board
                  key={item.id}
                  board={item}
                  addCard={addCardHandler}
                  removeBoard={() => removeBoard(item.id)}
                  removeCard={removeCard}
                  dragEnded={dragEnded}
                  dragEntered={dragEntered}
                  updateCard={updateCard}
                />
              ))}
              <div className="app_boards_last">
                <Editable
                  displayClass="app_boards_add-board"
                  editClass="app_boards_add-board_edit"
                  placeholder="Enter Board Name"
                  text="Add Board"
                  buttonText="Add Board"
                  onSubmit={addboardHandler}
                />
              </div>
            </div>
          </div>
        </div>
        </>
      );
}

export default KanbanDashboardPage