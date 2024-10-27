import React, { useEffect, useState } from 'react'

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
        <h1>This is all contact page</h1>
        <div className='grid grid-cols-3 gap-8'>
            {
                contacts.map(contact =>  <div key={contact.id} className="card w-96 bg-base-100 shadow-xl">
                    <figure>
                      <img src={contact.profilePicture} alt={`${contact.name}'s profile`} className="object-cover h-80 w-full" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{contact.name}</h2>
                      <p>Email: {contact.email}</p>
                      <p>Phone: {contact.phone}</p>
                      <p>Address: {contact.address}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => onUpdate(contact.id)}>
                          Update
                        </button>
                        <button className="btn btn-error" onClick={() => onDelete(contact.id)}>
                          Delete
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