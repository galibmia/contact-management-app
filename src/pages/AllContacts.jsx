import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaStar } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import { useOutletContext } from "react-router-dom"; // Import to use Outlet context
import Swal from "sweetalert2";
import Loading from "../components/Loading";

function AllContacts() {
  const [contacts, setContacts] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [filter, setFilter] = useState("all");
  const { token } = useOutletContext(); // Get the token from the context

  const fetchContacts = () => {
    fetch("https://contact-management-app-server.vercel.app/contacts", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  };

  useEffect(() => {
    if (token) {
      fetchContacts(); // Fetch contacts when the token is available
    }
  }, [token]); 

  const handleUpdate = (contact) => {
    setSelectedContact(contact);
    setUpdatedData(contact);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://contact-management-app-server.vercel.app/contacts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          if (res.ok) {
            fetchContacts();
            Swal.fire("Deleted!", "Your contact has been deleted.", "success");
          }
        });
      }
    });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address, image } = updatedData;

    fetch(`https://contact-management-app-server.vercel.app/contacts/${selectedContact._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
      body: JSON.stringify({ name, email, phone, address, image }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchContacts();
        setModalOpen(false);
        Swal.fire("Updated!", "Your contact has been updated.", "success");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const toggleFavorite = (contact) => {
    fetch(`https://contact-management-app-server.vercel.app/contacts/${contact._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
      body: JSON.stringify({ isFavorite: !contact.isFavorite }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchContacts();
        const message = contact.isFavorite
          ? "Removed from favorites!"
          : "Added to favorites!";
        Swal.fire("Success!", message, "success");
      });
  };

  const filteredContacts = contacts?.filter((contact) =>
    filter === "all" ? true : contact.isFavorite
  );

  if (contacts === null) {
    return <Loading />;
  }

  return (
    <div className="w-4/5 mx-auto my-8">
      <Helmet>
        <title>All Contacts | CMA</title>
      </Helmet>
      <h1 className="text-2xl lg:text-4xl font-bold text-center mt-14 mb-10">
        My All Contacts
      </h1>
      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered w-40"
        >
          <option value="all">All Contacts</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact._id}
            className="card w-full md:w-96 xl:w-full 2xl:w-96 mx-auto bg-base-100 shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.figure
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 0.6,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <img
                src={contact.image}
                alt={`${contact.name}'s profile`}
                className="object-cover h-96 w-full"
              />
            </motion.figure>

            <motion.div
              className="card-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: index * 0.2 }}
            >
              <div className="flex justify-between">
                <h2 className="card-title">{contact.name}</h2>
                <button
                  className="text-yellow-500 text-2xl"
                  onClick={() => toggleFavorite(contact)}
                >
                  <FaStar
                    className={
                      contact.isFavorite ? "fill-current" : "text-gray-300"
                    }
                  />
                </button>
              </div>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
              <p>Address: {contact.address}</p>
              <div className="card-actions justify-center mt-2">
                <button
                  className="btn bg-violet-400"
                  onClick={() => handleUpdate(contact)}
                >
                  <TbUserEdit className="text-xl" /> Update
                </button>
                <button
                  className="btn text-white btn-error"
                  onClick={() => handleDelete(contact._id)}
                >
                  <MdDeleteForever className="text-xl" /> Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <dialog className="modal modal-open">
          <form method="dialog" className="modal-box" onSubmit={handleModalSubmit}>
            <h3 className="font-bold text-lg">Update Contact</h3>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <input
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                name="email"
                value={updatedData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="phone"
                value={updatedData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="address"
                value={updatedData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="image"
                value={updatedData.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="input input-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn">Save</button>
              <button className="btn">Cancel</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default AllContacts;
