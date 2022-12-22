import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Input } from '../../components/input';
import { ApiStatus, IUserForm } from './User.type';
import Style from './UserFormStyle.module.css';
import { createUserAction, resetCreateListStatus } from './UserSlice';

const UserForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const { createUserFormStatus } = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const data : IUserForm = { name, email};
        dispatch(createUserAction(data));
    };

    useEffect(() => {
        if (createUserFormStatus === ApiStatus.success) {
            setName("")
            setEmail("")
            dispatch(resetCreateListStatus());
        }
    }, [createUserFormStatus])

    return (
        <div className={Style.container}>
            <form className={Style.form} onSubmit={onSubmitForm}>
                <Input label='Name' value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value)
                    console.log(name)
                }} />

                <Input label='Email' value={email} type='email' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value)
                }} />

                <div className={Style["btn-wrapper"]}>
                    <input type="submit" value="Create" />
                </div>

            </form>
        </div>
    )
    
};

export default UserForm;