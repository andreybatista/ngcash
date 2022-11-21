import React, { useRef, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Toast from '@radix-ui/react-toast';
import { NumericFormat } from 'react-number-format';

import styles from '../../../../styles/components/wallet.module.css'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [modalUsurioNg, setModalUsurioNg] = useState('');
  const [qty, setQty] = useState('');
  const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);
  const router = useRouter()

  function logOut() {
    Cookies.remove('logado');
    router.push("/")
  }

  function currencyFormat(number: string) {
    setQty(`R$ ${parseInt(number).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, 'R$1,')}`)
  }

  return (
    <div>
      <h2 className={styles.box__title}>Carteira</h2>
      <span className={styles.box__text}>Sua carteira Digital</span>

      <div className={styles.card}>
        <span className={styles.card__balance}>R$ 43,000</span>
        <h3 className={styles.card__balanceTitle}>Saldo Atual</h3>
      </div>

      <div>


        <div style={{ display: 'flex', gap: 18, marginTop: '1rem' }}>
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button
                className={`Button ${styles.button_violet}`}
              >
                Transferir
              </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="AlertDialogOverlay" />
              <AlertDialog.Content className="AlertDialogContent">
                <AlertDialog.Title className="AlertDialogTitle">Transferir para outros usuários NG</AlertDialog.Title>
                <AlertDialog.Description className="AlertDialogDescription">
                  Bastar útilizar o usuário para transferir para outra conta NG
                </AlertDialog.Description>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 25, justifyContent: 'flex-end' }}>


                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
                    <label className={styles.modal__label} htmlFor="userName">Usuário Ng</label>
                    <input onChange={e => setModalUsurioNg(e.target.value)} value={modalUsurioNg} className={styles.modal__input} id="userName" type="text" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
                    <label className={styles.modal__label} htmlFor="value">Quantidade</label>
                    <NumericFormat value={qty} onChange={e => setQty(e.target.value)} className={styles.modal__input} thousandSeparator={true} prefix={'R$ '} id="value"/>
                  </div>

                  <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                    <AlertDialog.Cancel asChild>
                      <button className="Button mauve">Cancelar</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button
                        disabled={qty == "" || modalUsurioNg == "" ? true : false}
                        className={`Button ${styles.btn__violet} ${qty == "" || modalUsurioNg == "" ? '' : styles.btn__violet_active}`}
                        onClick={() => {
                          setOpen(false);
                          window.clearTimeout(timerRef.current);
                          timerRef.current = window.setTimeout(() => {
                            eventDateRef.current = oneWeekAway();
                            setOpen(true);
                          }, 100);
                        }}
                      >
                        Confirmar
                      </button>
                    </AlertDialog.Action>
                  </div>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
          <button
            className={`Button ${styles.button_violet}`}
            onClick={logOut}
          >
            Sair
          </button>
        </div>

      </div>



      <Toast.Provider swipeDirection="right">
        <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
          <Toast.Title className="ToastTitle" style={{ width: '100%' }}>Transação realizada com sucesso </Toast.Title>
          <Toast.Description asChild>
            <div style={{ width: '100%', fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
              transação realizada com sucesso para <strong>{modalUsurioNg}</strong> no valor de <strong>{qty}</strong>
            </div>
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>

    </div >
  )
}


function oneWeekAway() {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}


export default Wallet