import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, toggleUserStatus } from "../services/api";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";

const UserTable = ({ users, onRefresh }) => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteUser(deleteId);
      toast.success("User deleted successfully!");
      setDeleteId(null);
      onRefresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
      setDeleteId(null);
    }
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === "Active" ? "InActive" : "Active";
    try {
      await toggleUserStatus(user._id, newStatus);
      toast.success(`Status changed to ${newStatus}`);
      onRefresh();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <>
      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this user?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FullName</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No users found</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.gender === "Male" ? "M" : "F"}</td>
                  <td>
                    {/* Clickable status badge — toggles on click */}
                    <span
                      className={`status-badge ${user.status === "Active" ? "status-active" : "status-inactive"}`}
                      onClick={() => handleToggleStatus(user)}
                      title="Click to toggle status"
                    >
                      {user.status} ∨
                    </span>
                  </td>
                  <td>
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="profile" className="profile-thumb" />
                    ) : (
                      <div className="profile-avatar">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                    )}
                  </td>
                  <td className="action-cell">
                    <button
                      className="three-dot-btn"
                      onClick={() => toggleMenu(user._id)}
                    >
                      ⋮
                    </button>
                    {openMenu === user._id && (
                      <div className="dropdown-menu">
                        <button
                          onClick={() => { navigate(`/view/${user._id}`); setOpenMenu(null); }}
                          className="dropdown-item view-item"
                        >
                          👁 View
                        </button>
                        <button
                          onClick={() => { navigate(`/edit/${user._id}`); setOpenMenu(null); }}
                          className="dropdown-item edit-item"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => { setDeleteId(user._id); setOpenMenu(null); }}
                          className="dropdown-item delete-item"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;