import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUsers, searchUsers, exportCSV } from "../services/api";
import UserTable from "../components/UserTable";
import SearchBar from "../components/Searchbar";
import Pagination from "../components/Pagination";

const ListPage = () => {
  const navigate = useNavigate();
  const [users, setUsers]             = useState([]);
  const [loading, setLoading]         = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getUsers(page, limit);
      setUsers(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setSearchQuery(query);
      setCurrentPage(1);
      const res = await searchUsers(query, 1);
      setUsers(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setCurrentPage(1);
    fetchUsers(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (searchQuery) {
      searchUsers(searchQuery, page)
        .then((res) => {
          setUsers(res.data.data);
          setTotalPages(res.data.pagination.totalPages);
        })
        .catch(() => toast.error("Failed to load page"));
    } else {
      fetchUsers(page);
    }
  };

  const handleExport = async () => {
    try {
      const res = await exportCSV();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("CSV exported successfully!");
    } catch (error) {
      toast.error("Export failed");
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  return (
    <div className="list-page">
      <div className="list-top-bar">MERN stack developer practical task</div>

      <div className="list-controls">
        <SearchBar onSearch={handleSearch} onClear={handleClear} />
        <div className="list-actions">
          <button onClick={() => navigate("/add")} className="btn btn-primary">
            + Add User
          </button>
          <button onClick={handleExport} className="btn btn-success">
            Export To Csv
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <UserTable users={users} onRefresh={() => fetchUsers(currentPage)} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ListPage;