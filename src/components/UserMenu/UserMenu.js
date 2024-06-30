import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import ModalAlert from '../ModalAlert';
import styles from './UserMenu.module.scss';

export default function UserMenu({ ...DOMprops }) {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onLogout = () => {
    dispatch(authOperations.logOut());
  };

  return (
    <div className={styles.container}>
      <span className={styles.name}>{name}</span>

      <button
        className={styles.button}
        type="button"
        onClick={toggleModal}
        {...DOMprops}
      >
        Log Out
      </button>
      {showModal && (
        <ModalAlert
          title="Do you really want to log out of your account??"
          btnTitle="Yes, Log Out"
          onBtnClick={onLogout}
          onClose={toggleModal}
        />
      )}
    </div>
  );
}
