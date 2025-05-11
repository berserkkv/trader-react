export default function UserList({ users, onEdit, onDelete }) {
    return (
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button onClick={() => onEdit(u)}>✏️</button>
            <button onClick={() => onDelete(u.id)}>❌</button>
          </li>
        ))}
      </ul>
    );
  }
  