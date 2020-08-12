import React from 'react';
import { bond, S } from './qd';
import $ from 'jquery';
// Cannot resolve @types for some reason. IDE autocompletion works fine.
// @ts-ignore
import dt from 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

// @ts-ignore
$.DataTable = dt

/**
 * Create a data grid column.
 */
interface DataGridCol {
  /** DataGrid column title. */
  title: S
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
  rows: S[]
  /** The columns in this table. */
  cols: DataGridCol[]
}

export const XDataGrid = bond(({ model: m }: { model: DataGrid }) => {
  let table: DataTables.Api | null = null
  const
    // Just for PoC. Need to agree on input data format.
    data = m.rows.reduce((all, one, i) => {
      const ch = Math.floor(i / m.cols.length);
      // @ts-ignore
      all[ch] = [].concat((all[ch] || []), one);
      return all
    }, []),
    init = () => { table = $('#table').DataTable({ columns: m.cols, data }) },
    dispose = () => { if (table) table.destroy() },
    render = () => <table id='table'></table>

  return { init, render, dispose }
})