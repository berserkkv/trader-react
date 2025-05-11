import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api/userApi";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (user) => {
    if (user.id) await updateUser(user);
    else await createUser(user);
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <h1>User Manager</h1>
      <UserForm onSave={handleSave} editUser={editingUser} />
      <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
    </div>
  );
}

export default App;
