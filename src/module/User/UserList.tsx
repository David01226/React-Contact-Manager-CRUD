import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Modal } from "../../components/Modal";
import { ApiStatus, IUser } from "./User.type";
import { deleteUserAction, getUserListAction } from "./UserSlice";
import { useNavigate } from 'react-router-dom';
import Style from './UserListStyle.module.css';

const UserList = () => {

    const [userDataToView, setUserDataToView] = useState<IUser | null>(null);
    const { list, listStatus } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch()

    const navigator = useNavigate();

    useEffect(() => {
        dispatch(getUserListAction());
    }, [])

    return (
        <div className={Style["contact-container"]}>
            
                {/* <tr>
                    <th>Sr. No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr> */}
                
                {listStatus === ApiStatus.loading && <tbody>List is loading</tbody>}

                {listStatus === ApiStatus.error && (
                    <tbody>Error while loading list</tbody>
                )}

                {listStatus === ApiStatus.ideal && 
                    list.map((user : IUser, index: number) => {
                        return (

                            <div className={Style["contact-item"]}>

                            <div className={Style["contact-left"]}>
                                <div className={Style["contact-img"]}>
                                <img src="/profile-img.png" alt="" />
                                <img className={Style["edit-profile-img"]} src="/edit-profile-img.png" alt="" />
                                </div>

                                <div className={Style["contact-details"]}>
                                <p>Name: <span>{user.name}</span></p>
                                <p>Email: <span>{user.email}</span></p>
                                <p>Tel: <span>{user.tel}</span></p>
                                <p>Company: <span>{user.company}</span></p>
                                </div>
                            </div>
                            

                            <div className={Style["contact-options"]}>
                            <img className={Style["edit-contact"]} src="/view-contact.png" alt="" onClick={() => {setUserDataToView(user);}}/>
                            <img className={Style["edit-contact"]} src="/edit-contact.png" alt="" onClick={() => {navigator(`/edit/${user.id}`)}}/>
                            <img className={Style["delete-contact"]} src="/delete-contact.png" alt="" onClick={() => {dispatch(deleteUserAction(user.id));}}/>
                    
                            </div>

                            </div>

                            // <tr>
                            //     <td>{index + 1}</td>
                            //     <td>{user.name}</td>
                            //     <td>{user.email}</td>
                            //     <td>
                            //         <div>
                            //             <input type="button" value="View" onClick={() => {setUserDataToView(user);}}/>
                            //             <input type="button" value="Edit" onClick={() => {navigator(`/edit/${user.id}`)}}/>
                            //             <input type="button" value="Delete" onClick={() => {dispatch(deleteUserAction(user.id));}}/>
                            //         </div>
                            //     </td>
                                
                            // </tr>
                        );
                    }) }

            {userDataToView && (
                <Modal 
                    title="User Details" 
                    onClose={() => {
                        setUserDataToView(null);
                    }} 
                >

                    <div>
                        <div>
                            <label> Name : {userDataToView.name}</label>
                        </div>
                        <div>
                            <label> Email : {userDataToView.email}</label>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default UserList;