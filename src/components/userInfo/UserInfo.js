import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/authOperations';
import { useAuth } from '../../hooks/useAuth';
import css from './UserInfo.module.css';

const UserInfo = () => {
const dispatch = useDispatch();
const { user } = useAuth();

    if (!user) {
        return null; // Display content only when the user is registered
    }

return (
    <div className={css.wrapper}>
        <p className={css.username}>Welcome, {user.email}</p>
        <button type="button" onClick={() => dispatch(logOut())}>
        Logout
        </button>
    </div>
);
};

export default UserInfo;
