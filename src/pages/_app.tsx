import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';

import '../../styles/globals.css'
import '../../styles/alertDialog.css'
import '../../styles/toast.css'
import '../../styles/scrollArea.css'

import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <ToastContainer/>
      <Component {...pageProps} />
    </>
  )
}
