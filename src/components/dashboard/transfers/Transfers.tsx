import Image from 'next/image'

import data from './transfers.json'

import styles from '../../../../styles/components/transfers.module.css'

import User from '../../../assets/user.png';
import ListTransfers from './ListTransfers';

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

interface Props {
  id: number;
  name: string;
  type: string;
  receive: boolean;
  value: string;
}

const Transfers = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h2 className={styles.box__title}>Ultimas Transferencias</h2>
      <button className={styles.box__text} onClick={handleOpen}>Historico completo</button>
          
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={styles.modalTitle}>
            title in a modal
          </h2>
          <h3 className={styles.modalText}>
          Text in a modal
          </h3>

          <ListTransfers transfers={data}/>
        </Box>
      </Modal>

  

      <ul className={styles.card__transfer}>
        {data.map((item: Props) => {
          return (
            <li key={item.id} className={styles.card__item}>
              <div>
                <Image height={50} width={50} src={User} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.type}</span>
                </div>
              </div>
              <h3 className={item.receive == true ? styles.positive : styles.negative}>
                {`${item.receive == true ? '+' : '-'}  R$${item.value}`}
              </h3>
            </li>
          )
        })}
      </ul>





    </div>
  )
}

export default Transfers