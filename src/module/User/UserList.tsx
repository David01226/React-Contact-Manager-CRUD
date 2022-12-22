import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Modal } from "../../components/input/Modal";
import { ApiStatus, IUser } from "./User.type";
import { deleteUserAction, getUserListAction } from "./UserSlice";

const UserList = () => {

    const [userDataToView, setUserDataToView] = useState<IUser | null>(null);
    const { list, listStatus } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserListAction());
    }, [])

    return (
        <>
            <table>
                <tbody>
                <tr>
                    <th>Sr. No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                
                {listStatus === ApiStatus.loading && <tbody>List is loading</tbody>}

                {listStatus === ApiStatus.error && (
                    <tbody>Error while loading list</tbody>
                )}

                {listStatus === ApiStatus.ideal && 
                    list.map((user : IUser, index: number) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div>
                                        <input type="button" value="View" onClick={() => {setUserDataToView(user);}}/>
                                        <input type="button" value="Edit" />
                                        <input type="button" value="Delete" onClick={() => {dispatch(deleteUserAction(user.id));}}/>
                                    </div>
                                </td>
                                
                            </tr>
                        );
                    }) }
                </tbody> 
            </table>
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
        </>
    );
};

export default UserList;