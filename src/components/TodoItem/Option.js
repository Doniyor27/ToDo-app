import { useState, useRef } from 'react';

const Option = ({ cardTitle, cardId, todoRemover }) => {
  const [ isEditable, setIsEditable ] = useState(true);
  const inputRef = useRef(null);

  const handleEdit = () => {
    setIsEditable(false);
    inputRef.current.focus();
  }

  const handleSave = (e) => {
    if(e.charCode === 13) {
      inputRef.current.blur();
    }
  }

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <input
        ref={inputRef}
        value={cardTitle}
        onBlur={() => setIsEditable(true)}
        disabled={isEditable}
        className="todo-edit-input"
        onKeyPress={handleSave}
      />

      <div>
        {/* <button className="btn btn-outline-primary me-3" onClick={handleEdit}>Edit</button> */}
        <button
          className="btn btn-outline-danger"
          onClick={() => todoRemover(cardId)}
        >Remove</button>
      </div>
    </li>
  )
}

export default Option;