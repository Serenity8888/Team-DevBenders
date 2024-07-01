import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../Button/index';
import styles from './DailyCaloriesForm.module.scss';
import Modal from '../Modal';
import DailyCalorieIntake from '../DailyCalorieIntake';
import { getPublicData } from '..//../js/backendAPI';
import { authSelectors } from '../../redux/auth';
import { useSelector } from 'react-redux';

import * as yup from 'yup';

const schema = yup.object().shape({
  height: yup
    .number('The value must be a number')
    .typeError('Enter a numeric value')
    .min(100, 'Specify a value greater than 100')
    .max(250, 'Specify a value less than 250')
    .integer('The value must be an integer')
    .required("Mandatory field"),
  age: yup
    .number('The value must be a number')
    .typeError('Enter a numeric value')
    .min(18, 'Specify a value greater than 18')
    .max(100, 'Specify a value less than 100')
    .integer('The value must be an integer')
    .required("Mandatory field"),
  currentWeight: yup
    .number('The value must be a number')
    .typeError('Enter a numeric value')
    .min(20, 'Specify a value greater than 20')
    .max(500, 'Specify a value less than 500')
    .integer('The value must be an integer')
    .required("Mandatory field"),
  desiredWeight: yup
    .number('The value must be a number')
    .typeError('Enter a numeric value')
    .min(20, 'Specify a value greater than 20')
    .max(500, 'Specify a value less than 500')
    .integer('The value must be an integer')
    .required("Mandatory field"),
});

function DailyCaloriesForm({
  onFormSubmit = () => {},
  height = '',
  age = '',
  currentWeight = '',
  desiredWeight = '',
  bloodType = '1',
}) {
  const [list, setList] = useState();
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const submitForm = async (values, { resetForm }) => {
    if (!isLoggedIn) {
      getPublicData(values).then(setList);
      toggleModal();
    }
    await onFormSubmit(values);
    resetForm({ values: '' });
  };

  return (
    <>
      {showModal && list && (
        <Modal onClose={toggleModal}>
          <DailyCalorieIntake foodsList={list} onClose={toggleModal} />
        </Modal>
      )}
      <Formik
        initialValues={{
          height,
          age,
          currentWeight,
          desiredWeight,
          bloodType,
        }}
        validationSchema={schema}
        validateOnChange={true}
        validateOnBlur={false}
        onSubmit={submitForm}
        enableReinitialize /* Formik needs to reset the form when the start values change */
      >
        {formik => {
          const { values, handleSubmit, errors, touched, isValid, dirty } =
            formik;
          return (
            <Form className={styles['calculate__form']} onSubmit={handleSubmit}>
              <div className={styles['field__wrapper']}>
                <Field
                  type="height"
                  name="height"
                  placeholder="Height *"
                  className={
                    errors.height && touched.height
                      ? styles['input-error']
                      : styles['calculate__field']
                  }
                />
                <ErrorMessage
                  name="height"
                  component="div"
                  className={styles['subtitle-error']}
                />
              </div>
              <div className={styles['field__wrapper']}>
                <Field
                  type="age"
                  name="age"
                  placeholder="Age *"
                  className={
                    errors.age && touched.age
                      ? styles['input-error']
                      : styles['calculate__field']
                  }
                />
                <ErrorMessage
                  name="age"
                  component="div"
                  className={styles['subtitle-error']}
                />
              </div>
              <div className={styles['field__wrapper']}>
                <Field
                  type="currentWeight"
                  name="currentWeight"
                  placeholder="Current Weight *"
                  className={
                    errors.CurrentW && touched.CurrentW
                      ? styles['input-error']
                      : styles['calculate__field']
                  }
                />
                <ErrorMessage
                  name="currentWeight"
                  component="div"
                  className={styles['subtitle-error']}
                />
              </div>
              <div className={styles['field__wrapper']}>
                <Field
                  type="desiredWeight"
                  name="desiredWeight"
                  placeholder="Desired Weight *"
                  className={
                    errors.DesiredW && touched.DesiredW
                      ? styles['input-error']
                      : styles['calculate__field']
                  }
                />
                <ErrorMessage
                  name="desiredWeight"
                  component="div"
                  className={styles['subtitle-error']}
                />
              </div>

              <div className={styles['radio__wrapper']}>
                <div id={styles['blood-group']}>Blood Type *</div>
                <div
                  role="group"
                  aria-labelledby="blood-group"
                  className={styles['radio']}
                >
                  <label>
                    1
                    <Field
                      type="radio"
                      name="bloodType"
                      value="1"
                      className={styles['radioItem']}
                      /*checked*/
                    />
                    <span className={styles['checkmark']}></span>
                  </label>
                  <label>
                    2
                    <Field
                      type="radio"
                      name="bloodType"
                      value="2"
                      className={styles['radioItem']}
                    />
                    <span className={styles['checkmark']}></span>
                  </label>
                  <label>
                    3
                    <Field
                      type="radio"
                      name="bloodType"
                      value="3"
                      className={styles['radioItem']}
                    />
                    <span className={styles['checkmark']}></span>
                  </label>
                  <label>
                    4
                    <Field
                      type="radio"
                      name="bloodType"
                      value="4"
                      className={styles['radioItem']}
                    />
                    <span className={styles['checkmark']}></span>
                  </label>
                </div>
              </div>

              <Button
                id={'button-form'}
                type="submit"
                disabled={!(dirty && isValid && values.bloodType)}
                className={
                  !(dirty && isValid && values.bloodType) ? 'disabled-btn' : ''
                }
                title={'Start losing wieght'}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default DailyCaloriesForm;
