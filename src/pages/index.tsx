import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

import logo from '../assets/logo-ngcash.svg'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    const cookie: any = Cookies.get("logado");
    if (!cookie) {
      router.push("/")
    } else {
      router.push("dashboard/")
    }
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    
    if (username == 'username' || password == 'password') {
      Cookies.set('logado', 'Fulano')
      router.push("dashboard/")
    } else {
      toast.error('Parece que você deve tentar `username` e `password`', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUsername('')
      setPassword('')
    }
    event.preventDefault();

  }
  return (
    <div>
      <Head>
        <title>Ng.Cash</title>
        <meta name="description" content="Ng.Cash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image className={styles.logo} src={logo} alt="Logo NG Cash" />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.container__title}>
            A CARTEIRA DA NOVA GERAÇÃO.
            <strong>É para todas as idades!</strong>
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
            >
              CONTINUAR
            </button>
          </form>

          <div className={styles.container__option}>
            <Link className={styles.option__link} href='/cadastrar'>
              Ainda não sou cliente
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
