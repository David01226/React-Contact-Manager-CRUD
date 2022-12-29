import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Input } from '../../components/input';
import { toastError } from '../../components/ToastifyConfig';
import { ApiStatus, IUpdateUserActionProps, IUserForm } from './User.type';
import Style from './UserFormStyle.module.css';
import { createUserAction, resetCreateListStatus, updateUserAction } from './UserSlice';

interface IProps {
    isEditForm? : boolean
}

const UserForm = (props: IProps) => {

    const { isEditForm } = props
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")
    const [company, setCompany] = useState("")

    const params = useParams();
    const userIdToEdit = useRef(parseInt(params.id || ""))

    const { list } = useAppSelector((state: RootState) => state.user);
    useEffect(() => {
        if(isEditForm && userIdToEdit.current) {
            const userData = list.filter(x => x.id === userIdToEdit.current)

            if (userData.length) {
                setName(userData[0].name);
                setEmail(userData[0].email);
                setTel(userData[0].tel);
                setCompany(userData[0].company);
            }
        }
    }, [isEditForm])

    const { createUserFormStatus, updateUserFormStatus } = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const data : IUserForm = { name, email, tel, company};

        if(name && email && tel && company) {
            if(isEditForm) {
                const dirtyFormData : IUpdateUserActionProps = {id:userIdToEdit.current, data}
                dispatch(updateUserAction(dirtyFormData))
            } else {
                const data : IUserForm = { name, email, tel, company};
                dispatch(createUserAction(data));
            } 
        } else {
            toastError("Please fill out the form")
        }
        
    };


    useEffect(() => {
        if (createUserFormStatus === ApiStatus.success) {
            setName("")
            setEmail("")
            setTel("")
            setCompany("")
            dispatch(resetCreateListStatus());
        }
    }, [createUserFormStatus])

    return (
        <div className={Style.container}>
            <div className={Style["contact-img"]}>
                <img src="/profile-img.png" alt="" />
                <img className={Style["edit-profile-img"]} src="/edit-profile-img.png" alt="" />
            </div>

            <form className={Style.form} onSubmit={onSubmitForm}>
                <Input placeholder ='Enter Name' label='Name' value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value)
                }} />

                <Input placeholder ='Enter Email' label='Email' value={email} type='email' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value)
                }} />

                <Input placeholder ='Enter Telephone Number' label='Tel' value={tel} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setTel(e.target.value)
                }} />

                <Input placeholder ='Enter Company' label='Company' value={company} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setCompany(e.target.value)
                }} />

                <div className={Style["btn-wrapper"]}>
                    <input 
                        type="submit" 
                        value={isEditForm ? "Update" : "Create"} 
                        disabled={
                            createUserFormStatus === ApiStatus.loading || 
                            updateUserFormStatus === ApiStatus.loading
                        }
                    />
                    
                </div>

            </form>
        </div>
    )
    
};

export default UserForm;