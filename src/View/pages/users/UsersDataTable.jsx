import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { UsersData } from "../../../model/services/data/UsersData";
import { toast } from "react-toastify";

export default function UserDataContainer() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const loggedUser = await UsersData.getCurrentUser();
        setCurrentUser(loggedUser);

        const userDocs = await UsersData.getAllUsers();
        setUsers(userDocs.filter(user => user.email !== loggedUser.email));
      } catch (error) {
        console.error("Error while searching for users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = async (id) => {
    try {
      await UsersData.blockUser(id);
      setUsers(users.map((user) =>
        user.id === id ? { ...user, isBlocked: true } : user
      ));
      toast.success("User successfully blocked.");
    } catch (error) {
      console.error("Error trying to block user:", error.message);
      toast.error("Error trying to unblock user.");
    }
  };

  const handleUnblock = async (id) => {
    try {
      await UsersData.unblockUser(id);
      setUsers(users.map((user) =>
        user.id === id ? { ...user, isBlocked: false } : user
      ));
      toast.success("User successfully unblocked");
    } catch (error) {
      console.error("Error trying to unblock user:", error.message);
      toast.error("Error trying to unblock user.");
    }
  };

  const handleAdmin = async (id) => {
    try {
      const user = users.find((user) => user.id === id);
      if (user) {
        if (user.isAdmin) {
          await UsersData.revokeAdminFromUser(id);
        } else {
          await UsersData.makeUserAdmin(id);
        }
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, isAdmin: !user.isAdmin } : user
          )
        );
      }
    } catch (error) {
      console.error("Erro ao alterar status de admin:", error.message);
      toast.error("Erro ao alterar status de admin.");
    }
  };

  const columns = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Tipo",
      selector: (row) => (
        <span
          className={`${
            row.isAdmin ? "bg-purple-500" : "bg-green-500"
          } text-white py-1 px-4 rounded-full text-xs inline-block`}
          style={{ display: 'inline-block', minWidth: '60px', textAlign: 'center' }}
        >
          {row.isAdmin ? "Admin" : "User"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => (
        <span
          className={`${
            row.isBlocked ? "bg-red-500" : "bg-green-500"
          } text-white py-1 px-4 rounded-full text-xs inline-block`}
          style={{ display: 'inline-block', minWidth: '60px', textAlign: 'center' }}
        >
          {row.isBlocked ? "Bloqueado" : "Ativo"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row) => {
        const isTestUser = row.email === "testeadm@gmail.com";
        const isCurrentUser = currentUser && row.email === currentUser.email;

        return (
          <div className="flex gap-2">
            {!row.isBlocked && !isTestUser && !isCurrentUser && (
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                onClick={() => handleBlock(row.id)}
              >
                Bloquear
              </button>
            )}
            {row.isBlocked && !isTestUser && !isCurrentUser && (
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md"
                onClick={() => handleUnblock(row.id)}
              >
                Desbloquear
              </button>
            )}
            <button
              className={`${
                isTestUser
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : row.isAdmin
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white py-1 px-3 rounded-md`}
              onClick={() => !isTestUser && handleAdmin(row.id)}
              disabled={isTestUser}
            >
              {row.isAdmin ? "Remover Admin" : "Tornar Admin"}
            </button>
          </div>
        );
      },
    },
  ];

  const customStyles = {
    rows: {
      style: {
        borderBottom: "3px solid #ddd",
      },
    },
    headCells: {
      style: {
        borderBottom: "3px solid #ddd",
        backgroundColor: "#f7f7f7",
        color: "#333",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        backgroundColor: "#fff",
      },
    },
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
        conditionalRowStyles={[
          {
            when: (row) => row.id % 2 === 0,
            style: {
              backgroundColor: "#f9f9f9", // Linhas pares com fundo cinza claro
            },
          },
        ]}
      />
    </div>
  );
}
