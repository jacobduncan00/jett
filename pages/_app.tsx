import '../styles/globals.css'
import "../styles/game.css";
import "../styles/modal.css";
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
