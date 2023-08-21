import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #7072be;
    width: 100%;
    border: none;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #474891;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

  const [ criptos, setCriptos] = useState([])
  const [ error, setError] = useState(false)

// moneda es el nombre del state que esta en el export de useSelectMonedas, en el array de abajo los toma por indice
  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
  const [ Criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

  useEffect(() => {
    const consultarAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCriptos = resultado.Data.map( cripto => {

        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }

        return objeto
      })

      setCriptos(arrayCriptos)
    }
    consultarAPI()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if([ moneda, Criptomoneda].includes('')){
      setError(true)
      return
    }

    setError(false)
    setMonedas({
      moneda,
      Criptomoneda
    })
  }

  
  return (
    <>
      { error && <Error>Todos los campos son obligatorios</Error>}

      <form
      onSubmit={handleSubmit}
      >
        <SelectMonedas/>
        <SelectCriptomoneda/>

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  )
}

export default Formulario