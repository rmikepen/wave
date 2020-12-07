import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { View } from './header'
import * as T from './qd'

const
  name = 'header',
  label = 'label',
  headerProps: T.Card<any> = {
    name,
    state: { nav: [{ label: 'group1', items: [{ name, label }] }] },
    changed: T.box(false)
  }

describe('Header.tsx', () => {
  it('Renders data-test attr', () => {
    const { queryByTestId } = render(<View {...headerProps} />)
    expect(queryByTestId(name)).toBeInTheDocument()
  })

  it('Closes nav on click', () => {
    const { container, queryByText } = render(<View {...headerProps} />)
    fireEvent.click(container.querySelector('.ms-Icon')!)

    const menuItem = queryByText(label)
    expect(menuItem).toBeInTheDocument()

    fireEvent.click(menuItem!)
    expect(menuItem).not.toBeVisible()
  })
})