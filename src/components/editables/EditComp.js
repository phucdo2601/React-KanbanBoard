import React, { useState } from 'react';
import { X } from 'react-feather';
import './EditComp.css'

const EditComp = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [inputValue, setInputValue] = useState(props.default || "");

  return (
    <>
        <div className="editable"> 

            {
                showEdit ? <>
                <form className={`editable_edit ${props.editClass || ''}`} onSubmit={(event) => {
                event.preventDefault();
                if (props.onSubmit) {
                    props.onSubmit(inputValue);
                }
                setShowEdit(false);
                setInputValue("");
            }}>
                <input 
                autoFocus
                type="text" 
                value={inputValue}
                onChange={(event) => {setInputValue(event.target.value)}}
                className="" 
                placeholder={props.placeholder || 'Enter Item'}/>
                <div className="editable_edit_footer">
                    <button type="submit" >{props.buttonText || "Add"}</button>
                    <X onClick={() =>setShowEdit(false)}/>
                </div>
            </form>
                </> : <>
                <p className={`editable_display ${props.displayClass || ''}`} onClick={()=> setShowEdit(true)}>{props.text || "Add Item"}</p>
                </>
            }

           
            
        </div>
    </>
  )
}

export default EditComp