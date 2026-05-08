import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, toggleUserStatus } from "../services/api";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";

const UserTable = ({ users, onRefresh }) => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId]       = useState(null);
  const [openMenu, setOpenMenu]       = useState(null);
  const [openStatus, setOpenStatus]   = useState(null);

  const handleDelete = async () => {
    try {
      await deleteUser(deleteId);
      toast.success("User deleted successfully!");
      setDeleteId(null);
      onRefresh();
    } catch (error) {
      toast.error("Failed to delete user");
      setDeleteId(null);
    }
  };

  const handleStatusChange = async (user, newStatus) => {
    try {
      await toggleUserStatus(user._id, newStatus);
      toast.success(`Status changed to ${newStatus}`);
      setOpenStatus(null);
      onRefresh();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Close dropdowns when clicking outside
  const handleOutsideClick = () => {
    setOpenMenu(null);
    setOpenStatus(null);
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

      <div className="table-wrapper" onClick={handleOutsideClick}>
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
                <td colSpan="7" className="no-data">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.gender === "Male" ? "M" : "F"}</td>

                  {/* STATUS DROPDOWN */}
                  <td>
                    <div className="status-wrapper">
                      <span
                        className={`status-badge ${user.status === "Active" ? "status-active" : "status-inactive"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenStatus(openStatus === user._id ? null : user._id);
                          setOpenMenu(null);
                        }}
                      >
                        {user.status}
                      </span>
                      {openStatus === user._id && (
                        <div className="status-dropdown" onClick={(e) => e.stopPropagation()}>
                          <div
                            className="status-option"
                            onClick={() => handleStatusChange(user, "Active")}
                          >
                            Active
                          </div>
                          <div
                            className="status-option"
                            onClick={() => handleStatusChange(user, "InActive")}
                          >
                            InActive
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* PROFILE IMAGE */}
                  <td>
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="profile" className="profile-thumb" />
                    ) : (
                      <div className="profile-avatar">
                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="default" className="profile-thumb" />
                      </div>
                    )}
                  </td>

                  {/* ACTION DROPDOWN */}
                  <td className="action-cell">
                    <button
                      className="three-dot-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === user._id ? null : user._id);
                        setOpenStatus(null);
                      }}
                    >
                      ⋮
                    </button>
                    {openMenu === user._id && (
                      <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="dropdown-item view-item"
                          onClick={() => { navigate(`/view/${user._id}`); setOpenMenu(null); }}
                        >
                          <span className="item-icon view-icon">●</span> View
                        </button>
                        <button
                          className="dropdown-item edit-item"
                          onClick={() => { navigate(`/edit/${user._id}`); setOpenMenu(null); }}
                        >
                          <span className="item-icon edit-icon">✎</span> Edit
                        </button>
                        <button
                          className="dropdown-item delete-item"
                          onClick={() => { setDeleteId(user._id); setOpenMenu(null); }}
                        >
                          <span className="item-icon delete-icon">■</span> Delete
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