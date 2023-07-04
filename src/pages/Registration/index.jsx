import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: {errors, isValid}

  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data)
    if (!data.payload) {
      alert('Не вдалося зареєструватися!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }

  };
  if (isAuth) {
    return <Navigate to='/'/>;
  }

  return (
    <Paper classes={{root: styles.root}}>
      <Typography classes={{root: styles.title}} variant="h5">
        Створити аккаунт
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{width: 100, height: 100}}/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField error={Boolean(errors.fullName?.message)}
                   helperText={errors.fullName?.message}
                   {...register('fullName', {required: 'Напишіть повне імя'})}
                   className={styles.field} label="Повну імя"
                   fullWidth/>

        <TextField error={Boolean(errors.email?.message)}
                   helperText={errors.email?.message}
                   type="email"
                   {...register('email', {required: 'Напишіть пошту'})}
                   className={styles.field} label="E-Mail"
                   fullWidth/>

        <TextField helperText={errors.password?.message}
                   error={Boolean(errors.password?.message)}
                   type="password"
                   {...register('password', {required: 'Напишіть пароль'})}
                   className={styles.field} label="Пароль"
                   fullWidth/>
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зареєструватися
        </Button>
      </form>
    </Paper>
  );
};
