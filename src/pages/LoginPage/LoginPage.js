import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import styles from './LoginPage.module.scss';
import s from '../../pages/MainPage/MainPage.module.scss';

import banana from "../../pages/MainPage/images/banana.png";
import strawberry from "../../pages/MainPage/images/strawberry.png";
import leaves from "../../pages/MainPage/images/leaves-new.png";
import leavesTable from "../../pages/MainPage/images/leaves-table-new.png";
import mainVector from "../../pages/MainPage/images/main-vector.svg";


import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
 
const schema = yup.object().shape({
  email: yup.string().min(7,'Mail must be at least 3 characters').max(254,'Mail should not exceed 254 characters').required("Mandatory field").email('The email address must be valid'),
  password: yup.string().min(8,'The password must be at least 8 characters long').required("Mandatory field").max(55,'The password must not exceed 55 characters'),
});

const initialValues = {
  email: '',
  password: '',  
}

export default function LoginView() {
  const dispatch = useDispatch();
  const [, setEmail] = useState('');
  const [, setPassword] = useState('');



  const handleSubmit = ({email,password}, {resetForm}) => {     

     setEmail(email);
     setPassword(password);  
     dispatch(authOperations.logIn({ email, password }));
   
    resetForm({email:"",password:""});
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
      <div className={styles.title__container}>
        <h1 className={styles.title}>LOG IN</h1>
      </div>    

      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
        <Form  className={styles.form} autoComplete="off">
        <label className={styles.label}>
          Email*
          <Field className={styles.input}
            type="email"
            name="email"
            autoComplete="off"
            required
            />
            <ErrorMessage name="email" component="div" className={styles.error} />
        </label>

        <label className={styles.label}>
          Password*
          <Field className={styles.input}
            type="password"
            name="password"       
            autoComplete="off"
            required
            />
            <ErrorMessage name="password" component="div" className={styles.error} />
        </label>
        <ul className={styles.list}>
            <li className={styles.item}>
              <button type="submit" className={styles.btn}>LOG IN</button>            
            </li>
            <li className={styles.item}>
              <a href='./register'>
                <button type="button" className={styles.btn__second}>REGISTER</button>           
              </a>
            </li>           
        </ul>        
      </Form>
      </Formik>
      
    </div>
          <div className={s['main__img--wrapper']}>
        <div className={s['leaf-first']}></div>
        <div className={s['leaf-second']}></div>
        <div className={s['leaf-third']}></div>
        <div className={s['leaf-fourth']}></div>

        <img src={leavesTable} className={s['leavesTable']} alt="leaves" />
        <img src={leaves} className={s['leaves']} alt="leaves" />
        <div id={s['banana']}>
          <img src={banana} className={s['banana']} alt="banana" />
        </div>
        <img
          src={strawberry}
          className={s['strawberry']}
          alt="strawberry"
        />
        <img
          src={mainVector}
          className={s['mainVector']}
          alt="backround-vector"
        />
      </div>
    </div>    
  );
}