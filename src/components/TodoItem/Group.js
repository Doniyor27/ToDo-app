import './main.scss';

const Group = ({ children }) => {
  return (
    <div className="list-group">
      { children }
    </div>
  )
};

export default Group;