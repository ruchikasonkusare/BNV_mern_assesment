import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById } from "../services/api";

const ViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(id)
      .then((res) => setUser(res.data.data))
      .catch(() => toast.error("Failed to load user"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loader">Loading...</div>;
  if (!user)   return <div className="loader">User not found</div>;

  return (
    <div className="view-page">
      <div className="profile-card">

        {/* Header */}
        <div className="profile-card-header">
          <div className="profile-avatar-large">
            {user.profileImage ? (
              <img src={user.profileImage} alt="profile" className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            )}
          </div>
          <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
          <span className={`badge ${user.status === "Active" ? "badge-active" : "badge-inactive"}`}>
            {user.status}
          </span>
        </div>

        {/* Details */}
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-icon">✉️</span>
            <div>
              <p className="detail-label">Email</p>
              <p className="detail-value">{user.email}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-icon">📱</span>
            <div>
              <p className="detail-label">Mobile</p>
              <p className="detail-value">{user.mobile}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-icon">👤</span>
            <div>
              <p className="detail-label">Gender</p>
              <p className="detail-value">{user.gender}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <div>
              <p className="detail-label">Location</p>
              <p className="detail-value">{user.location}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-icon">🗓️</span>
            <div>
              <p className="detail-label">Joined</p>
              <p className="detail-value">
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric", month: "long", day: "numeric"
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="profile-card-footer">
          <button onClick={() => navigate(`/edit/${user._id}`)} className="btn btn-primary">
            ✏️ Edit Profile
          </button>
          <button onClick={() => navigate("/")} className="btn btn-secondary">
            ← Back to List
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewPage;