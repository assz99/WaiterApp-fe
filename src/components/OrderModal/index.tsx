import { useEffect } from 'react'
import closeIcon from '../../assets/images/close-icon.svg'
import { Order } from '../../types/Orders'
import formatCurrency from '../../utils/formatCurrency'
import { Actions, ModalBody, OrderDetails, Overlay } from './styles'

interface OrderModalProps {
  visible: boolean
  order: Order | null
  onClose: () => void
  onCancelOrder: () => Promise<void>
  isLoading: boolean
  onChangeOrderStatus: () => void
}

export default function OrderModal ({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus
}: OrderModalProps) {
  useEffect(() => {
    function handleEscapeDown (event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscapeDown)

    return () => {
      document.removeEventListener('keydown', handleEscapeDown)
    }
  }, [onClose])

  if (!visible || !order) {
    return null
  }

  let total = 0
  order.products.forEach(({ product, quantity }) => {
    total = +quantity * product.price
  })

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong> Mesa {order.table}</strong>

          <button type='button' onClick={onClose}>
            <img src={closeIcon} />
          </button>
        </header>

        <div className='status-container'>
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕛'}
              {order.status === 'IN_PRODUCTION' && '🧑‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>

            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className='order-items'>
            {order.products.map(({ _id, product, quantity }) => (
              <div className='item' key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  width='56'
                  height='28.61'
                />
                <span className='quantity'>{quantity}X</span>
                <div className='product-details'>
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className='total'>
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
            <button
              type='button'
              className='primary'
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>
                {order.status === 'WAITING' && '🧑‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
              </strong>
            </button>
          )}

          <button
            type='button'
            className='secondary'
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            Cancelar Pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  )
}
