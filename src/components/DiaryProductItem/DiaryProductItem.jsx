import PropTypes from 'prop-types';
import { useState } from 'react';
import s from './DiaryProductItem.module.scss';
import ModalAlert from '../ModalAlert';

function DiaryProductItem({ title, weight, calories, id, date, onDeleteItem }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <li className={s.item}>
      <p className={s.text}>{title}</p>
      <p className={s.text}>
        {weight}
        <span className={s.size}>г</span>
      </p>
      <p className={s.text}>
        {calories}
        <span className={s.size}></span>
      </p>
      <button type="button" className={s.button} onClick={toggleModal}>
        &#10006;
      </button>
      {showModal && (
        <ModalAlert
          title="Do you really want to remove a product from the list?"
          btnTitle="Yes, delete"
          onBtnClick={onDeleteItem}
          id={id}
          date={date}
          onClose={toggleModal}
        />
      )}
    </li>
  );
}
DiaryProductItem.propTypes = {
  title: PropTypes.string.isRequired,
  weight: PropTypes.number,
  calories: PropTypes.number,
  id: PropTypes.string.isRequired,
};

export default DiaryProductItem;
