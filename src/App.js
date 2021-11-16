import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';

function App() {
  const [ todoInputText, setTodoInputText ] = useState('');
  const [ listItem, setListItem ] = useState([]);

  const handleSubmit = (event) => {
    listItem.push({
      id: listItem.length > 0 ? listItem[listItem.length-1].id + 1 : 0,
      title: todoInputText
    })
    console.log(listItem);
    setTodoInputText('');
    event.preventDefault();
  }

  const handleSave = () => {
    window.localStorage.setItem('todoList', JSON.stringify(listItem));
    alert('Successfully saved!');
  }

  const handleTodosRemove = () => {
    setListItem([]);
    window.localStorage.removeItem('todoList');
  }

  const handleSingleTodoRemove = (id) => {
    let removingElIndex = listItem.findIndex((todo) => todo.id === id);
    listItem.splice(removingElIndex, 1);
    window.localStorage.setItem('todoList', JSON.stringify(listItem));
    setListItem(JSON.parse(window.localStorage.getItem('todoList')))
  }

  useEffect(() => {
    if(window.localStorage.getItem('todoList')) {
      setListItem(JSON.parse(window.localStorage.getItem('todoList')))
    }
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>

        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">
              <h1>All elements: {listItem.length}</h1>
            </div>
            <div className="card-body">

              <form className="d-flex my-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control"
                  value={todoInputText}
                  onChange={(e) => setTodoInputText(e.target.value)}
                />
                <button className="btn btn-success" type="submit">Add</button>
              </form>

              <TodoItem.Group>
                {
                  listItem.map((item, index) => (
                    <TodoItem.Option
                      cardTitle={item.title}
                      cardId={item.id}
                      key={index}
                      todoRemover={handleSingleTodoRemove}
                    />
                  ))
                }
              </TodoItem.Group>
            </div>

            <div className="card-footer d-flex justify-content-end">
              <button className="btn btn-danger me-3" onClick={handleTodosRemove}>Discard</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>

        <div className="col-md-3">

        </div>
      </div>
    </div>
  );
}

export default App;
