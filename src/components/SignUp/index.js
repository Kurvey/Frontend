import React, { useState, useEffect } from 'react';
import styles from './signup.module.css';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import Error from '../Axios/Error'
import { registerUser } from '../../features/user/userAction'

export default function SignUp(props) {
  const [customError, setCustomError] = useState(null);
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/login')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch')
      return
    }
    console.log(data)
    // transform email string to lowercase to avoid case sensitivity issues during login
    dispatch(registerUser(data));
  }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>회원가입</h2>
      <form 
      onSubmit={handleSubmit(submitForm)} 
      className={styles.register}
      >
        {error && <Error>{error}</Error>}
        {customError && <Error>{customError}</Error>}
        <div className={styles.inputBox}>
            <label htmlFor="userId">아이디</label>
            <input
              id="userId"
              type="text"
              name="userId"
              placeholder='아이디'
              {...register('userId')}
              required
            />
        </div>
        <div className={styles.inputBox}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder='비밀번호'
              {...register('password')}
              required
            />
        </div>
        <div className={styles.inputBox}>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder='비밀번호 확인'
              {...register('confirmPassword')}
              required
            />
        </div>
        <div className={styles.inputBox}>
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder='이름'
              {...register('name')}
              required
            />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="birthDay">생년월일</label>
          <input
            id="birthDay"
            type="date"
            name="birthDay"
            {...register('birthDay')}
            required
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="gender">성별</label>
          <div className={styles.select}>
            <select {...register('gender')} defaultValue={'F'}>
              <option value="F">여성</option>
              <option value="M">남성</option>
            </select>
          </div>
        </div>

        <button type="submit" className='button'>
          회원가입
        </button>
      </form>
      <a href="/login">Login Here</a>
    </div>
  );
}
