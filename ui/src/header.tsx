// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as Fluent from '@fluentui/react'
import React from 'react'
import { stylesheet } from 'typestyle'
import { CardEffect, cards } from './layout'
import { NavGroup, XNav } from './nav'
import { B, bond, Box, box, Card, S } from './qd'
import { clas, getTheme, padding } from './theme'
import { Command, View as Toolbar } from './toolbar'

const
  theme = getTheme(),
  iconSize = 24,
  css = stylesheet({
    card: {
      display: 'flex',
      alignItems: 'center',
      padding: padding(8, 15),
    },
    lhs: {
      width: iconSize + 15,
      height: iconSize + 15,
      cursor: 'default',
    },
    burger: {
      $nest: {
        '&:hover': {
          color: theme.colors.page, // TODO improve
          cursor: 'pointer',
        },
      },
    },
    icon: {
      fontSize: iconSize,
      height: iconSize,
      width: iconSize,
    },
    title: {
      ...theme.font.s24,
      ...theme.font.w3,
    },
    subtitle: {
      position: 'relative',
      top: -5, // nudge up slightly to account for padding
      ...theme.font.s12,
    },
  })


/**
 * Render a page header displaying a title, subtitle and an optional navigation menu.
 * Header cards are typically used for top-level navigation.
 */
interface State {
  /** The title. */
  title: S
  /** The subtitle, displayed below the title. */
  subtitle: S
  /** The icon type, displayed to the left. */
  icon?: S
  /** The icon's color. */
  icon_color?: S
  /** The navigation menu to display when the header's icon is clicked. */
  nav?: NavGroup[]
  /** Items that should be displayed on the right side of the header. */
  items?: Command[]
}

const
  Navigation = bond(({ items, isOpenB }: { items: NavGroup[], isOpenB: Box<B> }) => {
    const
      hideNav = () => isOpenB(false),
      render = () => (
        <Fluent.Panel
          isLightDismiss
          type={Fluent.PanelType.smallFixedNear}
          isOpen={isOpenB()}
          onDismiss={hideNav}
          hasCloseButton={false}
        >
          <XNav items={items} />
        </Fluent.Panel>
      )
    return { render, isOpenB }
  })

export const
  View = bond(({ name, state, changed }: Card<State>) => {
    const
      navB = box(false),
      showNav = () => navB(true),
      render = () => {
        const
          { title, subtitle, icon, icon_color, nav, items } = state,
          burger = nav
            ? (
              <Fluent.Stack horizontal verticalAlign='center' className={clas(css.burger, css.lhs)} onClick={showNav}>
                <Fluent.FontIcon className={css.icon} iconName='GlobalNavButton' />
              </Fluent.Stack>
            ) : (
              <Fluent.Stack horizontal verticalAlign='center' className={css.lhs}>
                <Fluent.FontIcon className={css.icon} iconName={icon ?? 'WebComponents'} style={{ color: theme.color(icon_color) }} />
              </Fluent.Stack>
            )

        return (
          <Fluent.Stack data-test={name} horizontal verticalAlign='center'>
            {burger}
            <Fluent.StackItem grow={1}>
              <div className={css.title}>{title}</div>
              <div className={css.subtitle}>{subtitle}</div>
            </Fluent.StackItem>
            {nav && <Navigation items={nav} isOpenB={navB} />}
            {items && <Toolbar name={`${name}-toolbar`} changed={changed} state={{ items }} />}
          </Fluent.Stack>
        )
      }
    return { render, changed }
  })

cards.register('header', View, CardEffect.Raised)