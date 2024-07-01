import React, { useState, useEffect, useCallback } from 'react';
import s from './ProductForm.module.scss';
import {useForm} from 'react-hook-form'
import {getProductsSearch, addProductInDiary} from '..//..//js/backendAPI'
import debounce from 'lodash/debounce';


  function ProductForm({onSubmit, date}) {
  const [list, setList] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  const{
    register,
    handleSubmit,
    formState: {errors}
  } =useForm()

  const updateQuery = () => {if(name){
    getProductsSearch(name).then(setList)
  } return};

  //eslint-disable-next-line
  const delayedQuery = useCallback(debounce(updateQuery, 500), [name]);

  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [name, delayedQuery]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const onHandleSubmit = () => {
    addProductInDiary({ title: name, weight: number, date }).then(onSubmit)
    reset();
  }

  const reset = () => {
    setName('');
    setNumber('');
  }


  return (
    <div className={s.block}>
      <form onSubmit={handleSubmit(onHandleSubmit)} className={s.form}>
        <label className={s.name}>
          <input
            {...register('name', {
              required:'Enter more than 2 characters'
            })}
            type="text"
            name="name"
            className={s.inputName}
            value={name}
            onChange={handleInputChange}
            placeholder="Enter the name of the product"
            list="list"
          />
          {errors  && <span className={s.messageName}>{ errors.name?.message}</span>}
        </label>
        {list && <datalist id="list">
        {list.map(({ _id, title}) => (
          <option key={_id} value={title.ua}/>
        ))}</datalist>}


        <label className={s.gram}>
          <input
            {...register('number', {
              required: true,
              min: 1
            })}
            type="number"
            name="number"
            className={s.inputGram}
            value={number}
            onChange={handleInputChange}
            placeholder="Grams"
          />
          <span className={s.messageNumber}>{errors.number?.type === "required" && 'Enter your details'}</span>
          <span className={s.messageNumber}>{errors.number?.type === "min" && "Invalid value"}</span>
        </label>
        <button type='submit' className={s.button}>
          <p className={s.add}>Add</p>
          <span className={s.plus}>+</span>
        </button>
      </form> 
    </div>
  );

}


export default ProductForm