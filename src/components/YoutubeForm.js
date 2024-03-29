import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const YoutubeForm = () => {
    const form = useForm({
        defaultValues: {
            username: "Batman",
            email: "",
            channel: "",
            social: {
                twitter: "",
                facebook: ""
            },
            phoneNumbers: ["", ""],
            phNumbers: [{ number: "" }],
            age: 0,
            dob: new Date()
        }
    });
    const { register, control, handleSubmit, formState, watch, getValues, setValue } = form;
    const { errors, touchedFields, dirtyFields, isDirty } = formState;
    const { fields, append, remove } = useFieldArray({
        name: "phNumbers",
        control
    })

    console.log({ touchedFields, dirtyFields, isDirty });

    // const watchUsername = watch("username");
    // const watchUsernameEmail = watch(["username", "email"])
    // const watchForm = watch();

    // useEffect(() => {
    //     const subscription = watch((value) => {
    //         console.log(value);
    //     });

    //     // clean-up code
    //     return () => subscription.unsubscribe();
    // }, [watch])

    const handleGetValues = () => {
        console.log("form values: ", getValues());
        console.log("Channel: ", getValues("channel"));
        console.log("Username & Channel: ", getValues(["username", "channel"]));
    }

    const handleSetValue = () => {
        // setValue("username", "Akshay112233");

        setValue("channel", "Codeevolution", {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true
        })
    }

    const onSubmit = (data) => {
        console.log("Data submitted! ", data);
    }

    return (
        <>
            <h1>Youtube Form</h1>
            <div className='form-container'>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Username */}
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
                            })} />
                        {/* Displaying error messages */}
                        {
                            errors.username?.message &&
                            <p className='error'>{errors.username?.message}</p>
                        }
                    </div>

                    {/* Email */}
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
                            )} />
                        {
                            errors.email?.message &&
                            <p className='error'>{errors.email?.message}</p>
                        }
                    </div>

                    {/* Channel */}
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
                            })} />
                        {
                            errors.channel?.message &&
                            <p className='error'>{errors.channel?.message}</p>
                        }
                    </div>

                    {/* Nested objects */}
                    <div className='label-container'>
                        <label htmlFor='twitter'>Twitter</label>
                        <input
                            type="text"
                            id="twitter"
                            {...register("social.twitter")}
                        />
                    </div>

                    <div className='label-container'>
                        <label htmlFor='facebook'>Facebook</label>
                        <input
                            type="text"
                            id="facebook"
                            {...register("social.facebook", {
                                disabled: watch("social.twitter") === ""
                            })}
                        />
                    </div>

                    {/* Nested array */}
                    <div className='label-container'>
                        <label htmlFor='primary-phone'>Primary Phone Number</label>
                        <input
                            type="text"
                            id="primary-phone"
                            {...register("phoneNumbers[0]")}
                        />
                    </div>

                    <div className='label-container'>
                        <label htmlFor='secondary-phone'>Secondary Phone Number</label>
                        <input
                            type="text"
                            id="secondary-phone"
                            {...register("phoneNumbers[1]")}
                        />
                    </div>

                    {/* Dynamic fields */}
                    <div>
                        <label>List of phone numbers</label>
                        <div className='dynamic-container'>
                            {
                                fields.map((field, index) => {
                                    return (
                                        <div key={field.id} className="dynamic-field">
                                            <input
                                                type="text"
                                                {...register(`phNumbers.${index}.number`)}
                                            />
                                            {index > 0 &&
                                                <button className='remove-button' onClick={() => remove(index)}>
                                                    Remove phone number
                                                </button>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <button className='add-button' onClick={() => append({ number: "" })}>
                            Add phone number
                        </button>

                    </div>

                    {/* age */}
                    <div className='label-container'>
                        <label htmlFor='age'>Age</label>
                        <input
                            type="number"
                            id="age"
                            {...register("age", {
                                valueAsNumber: true,
                                required: {
                                    value: true,
                                    message: "Age is required"
                                }
                            })} />
                        {
                            errors.age?.message &&
                            <p className='error'>{errors.age?.message}</p>
                        }
                    </div>

                    {/* DOB */}
                    <div className='label-container'>
                        <label htmlFor='dob'>Date of birth</label>
                        <input
                            type="date"
                            id="dob"
                            {...register("dob", {
                                valueAsDate: true,
                                required: {
                                    value: true,
                                    message: "Date of birth is required"
                                }
                            })} />
                        {
                            errors.dob?.message &&
                            <p className='error'>{errors.dob?.message}</p>
                        }
                    </div>

                    <div className='button-flex'>
                        <div className='button-container'>
                            <button onClick={handleGetValues} className='get-values'>
                                Get Values
                            </button>
                        </div>

                        <div className='button-container'>
                            <button onClick={handleSetValue} className='set-value'>
                                Set Value
                            </button>
                        </div>
                    </div>

                    <div className='button-container'>
                        <button>Submit</button>
                    </div>
                </form>

                <DevTool control={control} />
            </div>
        </>
    )
}

export default YoutubeForm