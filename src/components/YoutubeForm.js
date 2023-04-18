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
                        {...register("username")} />
                </div>

                <div className='label-container'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")} />
                </div>

                <div className='label-container'>
                    <label htmlFor='channel'>Channel</label>
                    <input
                        type="text"
                        id="channel"
                        {...register("channel")}
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