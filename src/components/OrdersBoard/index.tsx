import React from 'react'
import { Order } from '../../types/Orders'
import { Board, OrdersContainer } from './styles'

interface OrdersBoardProps {
  icon: string
  title: string
  orders: Order[]
}

export default function OrdersBoard ({ icon, title }: OrdersBoardProps) {
  return (
    <Board>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>(1)</span>
      </header>

      <OrdersContainer>
        <button type='button'>
          <strong>Mesa 1</strong>
          <span>2 itens</span>
        </button>
      </OrdersContainer>

      <OrdersContainer>
        <button type='button'>
          <strong>Mesa 2</strong>
          <span>2 itens</span>
        </button>
      </OrdersContainer>
    </Board>
  )
}
