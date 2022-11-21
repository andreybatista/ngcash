import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import logo from '../assets/logo-ngcash.svg'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';

export default function Cadastrar() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    router.push("/")
    setOpen(false);
  };



  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setUsername('')
    setPassword('')

    event.preventDefault();

  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image className={styles.logo} src={logo} alt="Logo NG Cash" />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.container__title}>
            Crie sua conta
            <strong>Totalmente gratuito!</strong>
          </h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__box}>
              <input onChange={e => setUsername(e.target.value)} value={username} className={styles.form__input} type="text" id="username" required />
              <label className={styles.form__label} htmlFor="username">Username</label>
            </div>

            <div className={styles.form__box}>
              <input onChange={e => setPassword(e.target.value)} value={password} className={styles.form__input} type="password" required />
              <label className={styles.form__label} htmlFor="password">Password</label>
            </div>
            <button
              className={`${styles.form__button} ${username != '' && password != '' ? styles.form__button_active : ''}`}
              disabled={username != '' || password != '' ? false : true}
              type='submit'
              onClick={handleClickOpen}
            >
              CADASTRAR
            </button>
          </form>
        </div>
      </main>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Usuário cadastrado com sucesso!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Agora e so efetuar o login e aproveitar todas as vantages
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
