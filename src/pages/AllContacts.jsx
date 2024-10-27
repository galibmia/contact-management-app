import React, { useEffect, useState } from 'react'
import { TbUserEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";



function AllContacts() {
    const [contacts, setContacts] = useState(null);

    useEffect(() => {
        fetch('/contacts.json')
        .then(res => res.json())
        .then(data => {;
            setContacts(data);
        })
    }, []);

    if(contacts === null){
        return <h1>Loading</h1>
    }

  return (
    <div className='w-4/5 mx-auto'>
        <h1 className='text-4xl font-bold text-center mt-14 mb-8'>Your contacts</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
            {
                contacts.map(contact =>  <div key={contact.id} className="card w-full md:w-96 xl:w-full 2xl:w-96 mx-auto bg-base-100 shadow-xl">
                    <figure>
                      <img src={contact.profilePicture} alt={`${contact.name}'s profile`} className="object-cover h-80 w-full" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{contact.name}</h2>
                      <p>Email: {contact.email}</p>
                      <p>Phone: {contact.phone}</p>
                      <p>Address: {contact.address}</p>
                      <div className="card-actions justify-end">
                        <button className="btn bg-violet-400" onClick={() => onUpdate(contact.id)}>
                         <TbUserEdit className='text-xl'/> Update
                        </button>
                        <button className="btn text-white btn-error" onClick={() => onDelete(contact.id)}>
                         <MdDeleteForever className='text-xl'/> Delete
                        </button>
                      </div>
                    </div>
                  </div>)
            }
        </div>
    </div>
  )
}

export default AllContacts