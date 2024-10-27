import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';

const img_hosting_token = import.meta.env.VITE_Img_Hosting_Token;

function AddContact() {
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit, reset,  formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        setLoading(true);
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgUrl = imgResponse.data.url;
                    const { name, email, phone, address } = data;
                    const newItem = { name, email, image: imgUrl, phone, address }
                    
                    fetch('http://localhost:5000/contacts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newItem)
                    })
                    .then(res => res.json())
                    .then(contactResponse => {
                        if (contactResponse.insertedId) {
                            setLoading(false)
                            reset();
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Contact added successfully!',
                            });
                            
                        } else {
                            throw new Error('Failed to add contact');
                        }
                    })
                    .catch(error => {
                        setLoading(false);
                        console.error('Error:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'There was an error processing your request.',
                        });
                    });
                }
            })
    };

    if(loading){
        return <Loading></Loading>
    }
    
    return (
        <div className="max-w-4xl mx-auto my-10 p-5 bg-base-100 shadow-lg rounded-lg">
            <Helmet>
                <title>Add Item | CMA</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Contact</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form className="card-body bg-base-200 px-10" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name<span className='text-red-600'>*</span></span>
                    </label>
                    <input type="text" placeholder="Enter Name" {...register("name", { required: true, maxLength: 50 })} className="input rounded-none focus:ring-0 focus:border-0 focus:outline-none focus:shadow-md" />
                    {errors.name?.type === "required" && (
                        <p className='text-red-600 ps-1'>Name is required</p>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email<span className='text-red-600'>*</span></span>
                    </label>
                    <input type="email" placeholder="Enter Email" {...register("email", { required: true, maxLength: 50 })} className="input rounded-none focus:ring-0 focus:border-0 focus:outline-none focus:shadow-md" />
                    {errors.email?.type === "required" && (
                        <p className='text-red-600 ps-1'>Email is required</p>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone Number<span className='text-red-600'>*</span></span>
                    </label>
                    <input type="number" placeholder="Enter Phone number" {...register("phone", { required: true, maxLength: 11 })} className="input rounded-none focus:ring-0 focus:border-0 focus:outline-none focus:shadow-md" />
                    {errors.phone?.type === "required" && (
                        <p className='text-red-600 ps-1'>Phone number is required</p>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Address<span className='text-red-600'>*</span></span>
                    </label>
                    <input type="text" placeholder="Enter Address" {...register("address", { required: true, maxLength: 100 })} className="input rounded-none focus:ring-0 focus:border-0 focus:outline-none focus:shadow-md" />
                    {errors.address?.type === "required" && (
                        <p className='text-red-600 ps-1'>Address is required</p>
                    )}
                </div>
                <div className="form-control">
                    <label className="form-control w-full max-w-xs mt-4">
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered  w-full max-w-xs focus:outline-none" />
                    </label>
                </div>
                <div className="form-control mt-2">
                    <button type='submit' className="btn text-xl w-40 text-black rounded-lg">Add Contact</button>
                </div>
            </form>
        </div>
    )
}

export default AddContact