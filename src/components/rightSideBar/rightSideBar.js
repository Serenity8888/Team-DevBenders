import { useState, useEffect } from 'react';
import styles from './RightSideBar.module.scss';
import { getCurrentUser, getDiaryByDate } from '../../js/backendAPI';
import { toBackendDateString } from '../../js/utils';

export default function RightSideBar({
  userParams,
  userProducts,
  date,
  diaryProducts,
}) {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (userParams && userProducts) {
        //if we received the user parameters as props - we will write them in the state
        setUserData({
          parameters: userParams,
          notAllowedProducts: userProducts,
        });
        return; //and it will exit
      }
      const currentUser = await getCurrentUser(); //and if not received - we will ask for these parameters from the backend
      setUserData(currentUser); //to record the state
    }
    fetchUserData();
  }, [userParams, userProducts]);

  useEffect(() => {
    async function fetchDiary() {
      if (diaryProducts) {
        setProducts(diaryProducts);
      } else if (date) {
        getDiaryByDate(date).then(setProducts);
      }
    }
    fetchDiary();
  }, [date, diaryProducts]);

  const dailyRate = () => {
    if (userData?.parameters?.calories) {
      return userData.parameters.calories;
    }
    return false;
  };

  const totalCaloriesOfDay = () => {
    if (products) {
      return products
        .map(product => product.calories)
        .reduce((previousValue, number) => {
          return previousValue + number;
        }, 0);
    }
  };

  const dailyNorm = dailyRate(); 
  const consumed = totalCaloriesOfDay(); 
  const percentOfNormal = (consumed / dailyNorm) * 100; //n% of the norm
  const left = dailyNorm - consumed; //remaining

  return (
    <div className={styles.container}>
      <div className={styles.summery}>
        <h1 className={styles.header}>
          Summary for <span>{toBackendDateString(date)}</span>
        </h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className={styles.text}>Left</p>
            <span className={styles.text}>
              {left && userData?.notAllowedProducts?.length
                ? `${left.toFixed(0)} `
                : '0 '}
            </span>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>Consumed</p>
            <span className={styles.text}>
              {consumed && userData?.notAllowedProducts?.length
                ? `${consumed.toFixed(0)} `
                : '0 '}
            </span>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>Daily rate</p>
            <span className={styles.text}>
              {dailyNorm && userData?.notAllowedProducts?.length
                ? `${dailyNorm} `
                : '0 '}
            </span>
          </li>
          <li className={styles.item}>
            <p className={styles.last__text}>% of normal</p>
            <span className={styles.text}>
              {percentOfNormal && userData?.notAllowedProducts?.length
                ? `${percentOfNormal.toFixed(0)} %`
                : '0 %'}
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.norecommended}>
        <h2 className={styles.header}>Food not recommended</h2>
        <ul>
          {userData?.notAllowedProducts?.length ? (
            userData.notAllowedProducts.slice(0, 9).map(({ _id, title }) => (
              <li key={_id} className={styles.text_item}>
                <span>{title.ua}</span>
              </li>
            ))
          ) : (
            <p className={styles.text}>Your diet will be displayed here</p>
          )}
        </ul>
      </div>
    </div>
  );
}
