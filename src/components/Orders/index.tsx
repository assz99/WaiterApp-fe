import OrdersBoard from '../OrdersBoard'
import { Container } from './styles'

export default function Orders () {
  return (
    <Container>
      <OrdersBoard icon='🕛' title='Fila de Espera' />
      <OrdersBoard icon='🧑‍🍳' title='Em preparação' />
      <OrdersBoard icon='✅' title='Pronto!' />
    </Container>
  )
}
