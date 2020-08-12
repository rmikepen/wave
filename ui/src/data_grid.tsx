import React from 'react';
import { bond, S, B, box } from './qd';
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

/**
 * Create a data grid row.
 */
interface DataGridRow {
  /** An identifying name for this row. */
  name: S
  /** The cells in this row (displayed left to right). */
  cells: S[]
}
/**
 * Create a data grid column.
 */
interface DataGridCol {
  /** DataGrid data property name to display. */
  name: S
  /** DataGrid column label. */
  label: S
  /** Controls whether DataGrid column should be sortable or not. */
  sortable?: B
}
/** 
 * Create an interactive data grid.
 * 
 * This component is meant to display large data.
 * Basic features: filtering, sorting, pagination.
 * 
 */
export interface DataGrid {
  /** An identifying name for this component. */
  name: S
  /** The rows in this table. */
  rows: DataGridRow[]
  /** The columns in this table. */
  cols: DataGridCol[]
}

export const XDataGrid = bond(({ model: m }: { model: DataGrid }) => {
  const
    columns = m.cols.map(c => ({ key: c.name, name: c.label, sortable: c.sortable })),
    rows = m.rows.map(({ cells }) => {
      const item: any = {}
      m.cols.forEach((c, i) => item[c.name] = cells[i])
      return item
    }),
    initialRows = rows,
    currentRowsB = box(initialRows),
    sortDirectionB = box('NONE'),
    sortColumnB = box<S>(''),
    onSort = (sortCol: S, sortDirection: S) => {
      const comparer = (a: any, b: any) => {
        if (sortDirection === "ASC") return a[sortCol] > b[sortCol] ? 1 : -1
        else return a[sortCol] < b[sortCol] ? 1 : -1
      }
      currentRowsB(sortDirection === "NONE" ? initialRows : [...currentRowsB()].sort(comparer))
      sortDirectionB(sortDirection)
      sortColumnB(sortCol)
    },
    render = () => (
      <ReactDataGrid
        columns={columns}
        rows={currentRowsB()}
        onSort={onSort}
        sortDirection={sortDirectionB() as any}
        sortColumn={sortColumnB()}
      />
    )
  return { render, currentRowsB, sortColumnB, sortDirectionB }
}) 