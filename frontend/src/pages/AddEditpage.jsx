import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser, getUserById, updateUser } from "../services/api";

const initialForm = {
  firstName:    "",
  lastName:     "",
  email:        "",
  mobile:       "",
  gender:       "",
  status:       "",
  location:     "",
  profileImage: "",
};

const validate = (form) => {
  const errors = {};
  if (!form.firstName.trim())                        errors.firstName = "First name is required";
  else if (form.firstName.length < 2)                errors.firstName = "Min 2 characters";
  else if (!/^[a-zA-Z]+$/.test(form.firstName))      errors.firstName = "Letters only";

  if (!form.lastName.trim())                         errors.lastName = "Last name is required";
  else if (form.lastName.length < 2)                 errors.lastName = "Min 2 characters";
  else if (!/^[a-zA-Z]+$/.test(form.lastName))       errors.lastName = "Letters only";

  if (!form.email.trim())                            errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email))       errors.email = "Invalid email format";

  if (!form.mobile.trim())                           errors.mobile = "Mobile is required";
  else if (!/^[0-9]{10}$/.test(form.mobile))         errors.mobile = "Must be 10 digits";

  if (!form.gender)                                  errors.gender = "Gender is required";
  if (!form.status)                                  errors.status = "Status is required";
  if (!form.location.trim())                         errors.location = "Location is required";

  return errors;
};

const AddEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm]     = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (isEdit) {
      getUserById(id)
        .then((res) => {
          const u = res.data.data;
          setForm({
            firstName:    u.firstName,
            lastName:     u.lastName,
            email:        u.email,
            mobile:       u.mobile,
            gender:       u.gender,
            status:       u.status,
            location:     u.location,
            profileImage: u.profileImage || "",
          });
          if (u.profileImage) setPreview(u.profileImage);
        })
        .catch(() => toast.error("Failed to load user"));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setForm({ ...form, profileImage: reader.result });
      setPreview(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      if (isEdit) {
        await updateUser(id, form);
        toast.success("User updated successfully!");
      } else {
        await createUser(form);
        toast.success("User created successfully!");
      }
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-top-bar">MERN stack developer practical task</div>
        <h2 className="form-title">
          {isEdit ? "Edit User Details" : "Register Your Details"}
        </h2>

        <div className="form-body">   {/* ✅ add this wrapper */}
          {/* profile upload */}
          <div className="profile-upload">
            <div className="profile-preview">
              {preview ? (
                <img src={preview} alt="preview" className="preview-img" />
              ) : (
                <div className="preview-placeholder">📷</div>
              )}
            </div>
            {/* <label className="upload-label">
              Select Your Profile
              <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
            </label> */}
          </div>

          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-row">
              <div className="form-group">
                <label>First name</label>
                <input name="firstName" placeholder="Enter FirstName" value={form.firstName} onChange={handleChange} className={`form-input ${errors.firstName ? "input-error" : ""}`} />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input name="lastName" placeholder="Enter LastName" value={form.lastName} onChange={handleChange} className={`form-input ${errors.lastName ? "input-error" : ""}`} />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email address</label>
                <input name="email" type="email" placeholder="Enter Email" value={form.email} onChange={handleChange} className={`form-input ${errors.email ? "input-error" : ""}`} />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input name="mobile" placeholder="Enter Mobile" value={form.mobile} onChange={handleChange} className={`form-input ${errors.mobile ? "input-error" : ""}`} />
                {errors.mobile && <span className="error-text">{errors.mobile}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Select Your Gender</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="gender" value="Male" checked={form.gender === "Male"} onChange={handleChange} /> Male
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="gender" value="Female" checked={form.gender === "Female"} onChange={handleChange} /> Female
                  </label>
                </div>
                {errors.gender && <span className="error-text">{errors.gender}</span>}
              </div>
              <div className="form-group">
                <label>Select Your Status</label>
                <select name="status" value={form.status} onChange={handleChange} className={`form-input ${errors.status ? "input-error" : ""}`}>
                  <option value="">Select...</option>
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </select>
                {errors.status && <span className="error-text">{errors.status}</span>}
              </div>
            </div>



            <div className="form-row">
              <div className="form-group">
                <label>Profile Image</label>
                        
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`form-input ${errors.profileImage ? "input-error" : ""}`}
                />
            
                {form.profileImage && (
                  <small className="file-name">
                    File selected ✔
                  </small>
                )}
            
                {errors.profileImage && (
                  <span className="error-text">{errors.profileImage}</span>
                )}
              </div>
              <div className="form-group">
                <label>Enter Your Location</label>
                <input name="location" placeholder="Enter Your Location" value={form.location} onChange={handleChange} className={`form-input ${errors.location ? "input-error" : ""}`} />
                {errors.location && <span className="error-text">{errors.location}</span>}
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update" : "Submit"}
            </button>
          </form>
        </div>  {/* end form-body */}
      </div>
    </div>
  );
};


export default AddEditPage;