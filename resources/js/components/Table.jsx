import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'

const Styles = styled.div`
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function TableElements({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>
                          {cell.column.id === 'team_name' ? <a href="#" data-toggle="modal" data-target="#teamModal">{cell.render('Cell')}</a> : cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
    </>
  )
}

function Table(props) {
    const data = props.data;
    const columns = [
        {
            Header: 'Position',
            accessor: 'position',
        },
        {
            Header: 'Team Name',
            accessor: 'team_name',
        },
        {
            Header: 'Played',
            accessor: 'overall.games_played',
        },
        {
            Header: 'Won',
            accessor: 'overall.won',
        },
        {
            Header: 'Drawn',
            accessor: 'overall.draw',
        },
        {
            Header: 'Lost',
            accessor: 'overall.lost',
        },
        {
            Header: 'Goal',
            accessor: 'overall.goals_scored',
        },
        {
            Header: 'Difference',
            accessor: 'total.goal_difference',
        },
        {
            Header: 'Points',
            accessor: 'points',
        },
    ];

  return (
    <Styles>
      <TableElements columns={columns} data={data} />
    </Styles>
  )
}

export default Table
