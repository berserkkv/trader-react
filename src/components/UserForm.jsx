import { useState, useEffect } from "react";

export default function UserForm({ onSave, editUser }) {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    if (editUser) setUser(editUser);
  }, [editUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
    setUser({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">{editUser ? "Update" : "Create"}</button>
    </form>
  );
}
