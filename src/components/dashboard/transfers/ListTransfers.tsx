import React, { useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Image from 'next/image';


import styles from '../../../../styles/components/transfers.module.css'

import User from '../../../assets/user.png';


interface Props {
  id: number;
  name: string;
  type: string;
  receive: boolean;
  value: string;
  date: string;
}


const ListTransfers = ({ transfers }: any) => {
  const [dataTransfers, setDataTransfers] = useState(transfers)
  const [cashIn, setCashIn] = useState(false)
  const [cashOut, setCashOut] = useState(false)
  const [filterDate, setFilterDate] = useState('')
  const [value, setValue] = useState<Dayjs | null>(
    dayjs(new Date()),
  );

  const handleChange = (newValue: any | null) => {
    setCashIn(false)
    setCashOut(false)
    setValue(newValue);
    setFilterDate(`${newValue?.$D}/${newValue?.$M + 1}/${newValue?.$y}`)
    setDataTransfers(
      transfers.filter((item: Props) => (
        item.date == `${newValue?.$D}/${newValue?.$M + 1}/${newValue?.$y}`
      ))
    )
  };

  function handleFilterCashIn() {
    setCashOut(false)
    setCashIn(true)
    if (filterDate) {
      setDataTransfers(
        transfers.filter((item: Props) => (
        item.date == filterDate && item.receive == true
      )))
    } else {
      setDataTransfers(transfers.filter((item: Props) => item.receive == true))
    }
  }
  function handleFilterCashOut() {
    setCashIn(false)
    setCashOut(true)
    if (filterDate) {
      setDataTransfers(
        transfers.filter((item: Props) => (
          item.date == filterDate && item.receive == false
        )))
    } else {
      setDataTransfers(transfers.filter((item: Props) => item.receive == false))
    }
  }


  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <MobileDatePicker
              label="Data"
              inputFormat="DD/MM/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 18 }}>
          <button onClick={handleFilterCashIn} className={`${styles.btn} ${cashIn == true ? `${styles.btn__active}` : ''}`}>Cash-In</button>
          <button onClick={handleFilterCashOut} className={`${styles.btn} ${cashOut == true ? `${styles.btn__active}` : ''}`}>Cash-Out</button>
        </div>
      </div>

      <ScrollArea.Root className="ScrollAreaRoot" style={{ width: '100%', marginTop: '1rem' }}>
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div style={{ padding: '15px 20px' }}>
            {dataTransfers.map((item: Props) => {
              return (
                <li key={item.id} className={styles.card__item}>
                  <div>
                    <Image height={50} width={50} src={User} alt={item.name} />
                    <div>
                      <strong style={{ color: 'var(--color-secondary)' }}>{item.name}</strong>
                      <span>{item.type}</span>
                    </div>
                  </div>
                  <h3 className={item.receive == true ? styles.positive : styles.negative}>
                    {`${item.receive == true ? '+' : '-'}  R$${item.value}`}
                  </h3>
                </li>
              )
            })}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
      </ScrollArea.Root>
    </>
  )
}

export default ListTransfers