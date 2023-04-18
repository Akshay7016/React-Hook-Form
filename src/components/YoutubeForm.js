import React from 'react'
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const YoutubeForm = () => {
    const form = useForm({
        defaultValues: {
            username: "",
            email: "",
            channel: "",
        }
    });
    const { register, control, handleSubmit } = form;

    const onSubmit = (data) => {
        console.log("Data submitted! ", data);
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='label-container'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message: "username minimum length should be 5"
                            }
                        })}
                    />
                </div>

                <div className='label-container'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            // Validation
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                message: "invalid email format"
                            },

                            //custom validation
                            validate: {
                                notAdmin: (fieldValue) => {
                                    return fieldValue !== "admin@example.com" || "Enter a different email address"
                                },

                                notBlackListed: (fieldValue) => {
                                    return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                                }
                            }
                        }
                        )}
                    />
                </div>

                <div className='label-container'>
                    <label htmlFor='channel'>Channel</label>
                    <input
                        type="text"
                        id="channel"
                        {...register("channel", {
                            required: {
                                value: true,
                                message: "Channel name is required"
                            }
                        })}
                    />
                </div>

                <div className='button-container'>
                    <button>Submit</button>
                </div>
            </form>

            <DevTool control={control} />
        </div>
    )
}

export default YoutubeForm