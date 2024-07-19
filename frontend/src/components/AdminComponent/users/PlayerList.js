import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        const newAccessToken = await fetchNewAccessToken();
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          getPlayers();
        } else {
          console.log("Gagal mendapatkan accessToken baru");
          return;
        }
      }

      const response = await axios.get("http://localhost:5000/players", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized, redirecting to login...");
      } else if (error.response && error.response.status === 403) {
        console.log("Access token expired, trying to refresh...");
        const newAccessToken = await fetchNewAccessToken();
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          getPlayers();
        } else {
          console.log("Gagal mendapatkan accessToken baru");
        }
      }
    }
  };

  const fetchNewAccessToken = async () => {
    try {
      const refreshToken = getCookie("refreshToken");

      const response = await axios.get("http://localhost:5000/token", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      return response.data.accessToken;
    } catch (error) {
      console.error("Error fetching new access token:", error);
      return null;
    }
  };

  const handleSelectPlayer = (userId) => {
    setSelectedPlayers((prevSelectedPlayers) =>
        prevSelectedPlayers.includes(userId)
            ? prevSelectedPlayers.filter((id_player) => id_player !== userId)
            : [...prevSelectedPlayers, userId]
    );
};

const deleteSelectedPlayers = async () => {
    try {
        const accessToken = getCookie("refreshToken");

        for (let id_player of selectedPlayers) {
            await axios.delete(`http://localhost:5000/players/${id_player}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        }
        setSelectedPlayers([]);
        getPlayers();
    } catch (error) {
        console.error("Error deleting players:", error);
    }
};
  const confirmDeleteSelected = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedPlayers();
        Swal.fire(
          "Deleted!",
          "The selected players have been deleted.",
          "success"
        );
      }
    });
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Player List</h1>
                <div className="flex items-center">
                    <Link to="/addPlayer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                        Add New
                    </Link>
                    <button onClick={confirmDeleteSelected} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={selectedPlayers.length === 0}>
                        Delete Selected
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="w-full table-auto text-sm font-light">
                    <thead className="bg-gray-200 text-xs font-medium uppercase tracking-wider text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left"></th>
                            <th className="px-4 py-3 text-left">No</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Password</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={player.id_player} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                <td className="px-4 py-3 text-left">
                                    <input type="checkbox" checked={selectedPlayers.includes(player.id_player)} onChange={() => handleSelectPlayer(player.id_player)} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                </td>
                                <td className="px-4 py-3 text-left">{index + 1}</td>
                                <td className="px-4 py-3 text-left">{player.name}</td>
                                <td className="px-4 py-3 text-left">{player.email}</td>
                                <td className="px-4 py-3 text-left">{player.password}</td>
                                <td className="px-4 py-3 text-left">{player.role}</td>
                                <td className="px-4 py-3 text-left">
                                    <Link to={`/editPlayer/${player.id_player}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
};

export default PlayerList;
