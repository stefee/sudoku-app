import { useEffect, useRef } from 'react'
import Head from 'next/head'

const useKeydown = (key, action) => {
  useEffect(() => {
    const onKeydown = event => {
      if (event.key === key) action()
    }

    window.addEventListener('keydown', onKeydown)

    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [])
}

const SudokuTableCell = ({ rowNumber, columnNumber }) => {
  const sudokuCellId = `r${rowNumber}c${columnNumber}`
  const sudokuCellReadableLabel = sudokuCellId.toUpperCase()
  const inputId = `sudoku-cell-${sudokuCellId}`

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      const onKeydown = event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
        }
      }

      inputRef.current.addEventListener('keydown', onKeydown)

      return () => {
        window.removeEventListener('onkeydown', onKeydown)
      }
    }
  }, [])

  return (
    <td data-sudoku-cell-row-number={rowNumber} data-sudoku-cell-column-number={columnNumber}>
      <label htmlFor={inputId} className="visually-hidden">
        {sudokuCellReadableLabel}
      </label>
      <input
        ref={inputRef}
        id={inputId}
        name={inputId}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </td>
  )
}

const SudokuTableRow = ({ rowNumber }) => {
  const cells = []

  for (const columnNumber of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    cells.push(
      <SudokuTableCell
        key={columnNumber}
        rowNumber={rowNumber}
        columnNumber={columnNumber}
      />
    )
  }

  return <tr data-sudoku-row-number={rowNumber}>{cells}</tr>
}

const SudokuTable = () => {
  const tableRef = useRef(null)

  useKeydown('ArrowRight', () => {
    if (
      tableRef.current &&
      tableRef.current.contains &&
      tableRef.current.contains(document.activeElement) &&
      document.activeElement.tagName === 'INPUT'
    ) {
      let tableCellElement
      let tableRowElement

      {
        // find parent table cell by tag name
        let el = document.activeElement
        while (el.parentElement && !tableCellElement) {
          el = el.parentElement
          if (el.tagName === 'TD') {
            tableCellElement = el
          }
        }
      }

      {
        // find parent table row by tag name
        let el = document.activeElement
        while (el.parentElement && !tableRowElement) {
          el = el.parentElement
          if (el.tagName === 'TR') {
            tableRowElement = el
          }
        }
      }

      const cellColumnNumber = parseInt(tableCellElement.getAttribute('data-sudoku-cell-column-number'), 10)
      const nextCellColumnNumber = (cellColumnNumber % 9) + 1

      const nextCell = tableRowElement.querySelector(`td[data-sudoku-cell-column-number="${nextCellColumnNumber}"] input`)

      if (nextCell) {
        nextCell.focus()
      } else {
        console.error('Couldn\'t find next cell', `nextCellColumnNumber: ${nextCellColumnNumber}`)
      }
    }
  })

  useKeydown('ArrowLeft', () => {
    if (
      tableRef.current &&
      tableRef.current.contains &&
      tableRef.current.contains(document.activeElement) &&
      document.activeElement.tagName === 'INPUT'
    ) {
      let tableCellElement
      let tableRowElement

      {
        // find parent table cell by tag name
        let el = document.activeElement
        while (el.parentElement && !tableCellElement) {
          el = el.parentElement
          if (el.tagName === 'TD') {
            tableCellElement = el
          }
        }
      }

      {
        // find parent table row by tag name
        let el = document.activeElement
        while (el.parentElement && !tableRowElement) {
          el = el.parentElement
          if (el.tagName === 'TR') {
            tableRowElement = el
          }
        }
      }

      const cellColumnNumber = parseInt(tableCellElement.getAttribute('data-sudoku-cell-column-number'), 10)
      const nextCellColumnNumber = 9 - ((10 - cellColumnNumber) % 9)

      const nextCell = tableRowElement.querySelector(`td[data-sudoku-cell-column-number="${nextCellColumnNumber}"] input`)

      if (nextCell) {
        nextCell.focus()
      } else {
        console.error('Couldn\'t find next cell', `nextCellColumnNumber: ${nextCellColumnNumber}`)
      }
    }
  })

  useKeydown('ArrowDown', () => {
    if (
      tableRef.current &&
      tableRef.current.contains &&
      tableRef.current.contains(document.activeElement) &&
      document.activeElement.tagName === 'INPUT'
    ) {
      let tableCellElement
      let tableRowElement
      let tableBodyElement

      {
        // find parent table cell by tag name
        let el = document.activeElement
        while (el.parentElement && !tableCellElement) {
          el = el.parentElement
          if (el.tagName === 'TD') {
            tableCellElement = el
          }
        }
      }

      {
        // find parent table row by tag name
        let el = document.activeElement
        while (el.parentElement && !tableRowElement) {
          el = el.parentElement
          if (el.tagName === 'TR') {
            tableRowElement = el
          }
        }
      }

      {
        // find parent table body by tag name
        let el = document.activeElement
        while (el.parentElement && !tableBodyElement) {
          el = el.parentElement
          if (el.tagName === 'TBODY') {
            tableBodyElement = el
          }
        }
      }

      const cellColumnNumber = parseInt(tableCellElement.getAttribute('data-sudoku-cell-column-number'), 10)
      const cellRowNumber = parseInt(tableCellElement.getAttribute('data-sudoku-cell-row-number'), 10)

      const nextCellRowNumber = (cellRowNumber % 9) + 1

      const nextCell = tableBodyElement.querySelector(`td[data-sudoku-cell-column-number="${cellColumnNumber}"][data-sudoku-cell-row-number="${nextCellRowNumber}"] input`)

      if (nextCell) {
        nextCell.focus()
      } else {
        console.error('Couldn\'t find next cell', `cellColumnNumber: ${cellColumnNumber}`, `nextCellRowNumber: ${nextCellRowNumber}`)
      }
    }
  })

  useKeydown('ArrowUp', () => {
    if (
      tableRef.current &&
      tableRef.current.contains &&
      tableRef.current.contains(document.activeElement) &&
      document.activeElement.tagName === 'INPUT'
    ) {
      let tableCellElement
      let tableRowElement
      let tableBodyElement

      {
        // find parent table cell by tag name
        let el = document.activeElement
        while (el.parentElement && !tableCellElement) {
          el = el.parentElement
          if (el.tagName === 'TD') {
            tableCellElement = el
          }
        }
      }

      {
        // find parent table row by tag name
        let el = document.activeElement
        while (el.parentElement && !tableRowElement) {
          el = el.parentElement
          if (el.tagName === 'TR') {
            tableRowElement = el
          }
        }
      }

      {
        // find parent table body by tag name
        let el = document.activeElement
        while (el.parentElement && !tableBodyElement) {
          el = el.parentElement
          if (el.tagName === 'TBODY') {
            tableBodyElement = el
          }
        }
      }

      const cellColumnNumber = parseInt(tableCellElement.getAttribute('data-sudoku-cell-column-number'), 10)
      const cellRowNumber = parseInt(tableCellElement.getAttribute('data-sudoku-cell-row-number'), 10)

      const nextCellRowNumber = 9 - ((10 - cellRowNumber) % 9)

      const nextCell = tableBodyElement.querySelector(`td[data-sudoku-cell-column-number="${cellColumnNumber}"][data-sudoku-cell-row-number="${nextCellRowNumber}"] input`)

      if (nextCell) {
        nextCell.focus()
      } else {
        console.error('Couldn\'t find next cell', `cellColumnNumber: ${cellColumnNumber}`, `nextCellRowNumber: ${nextCellRowNumber}`)
      }
    }
  })

  useKeydown('Backspace', () => {
    if (
      tableRef.current &&
      tableRef.current.contains &&
      tableRef.current.contains(document.activeElement) &&
      document.activeElement.tagName === 'INPUT' &&
      document.activeElement.value
    ) {
      document.activeElement.value = ''
    }
  })

  const tableRows = []

  for (const rowNumber of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    tableRows.push(
      <SudokuTableRow key={rowNumber} rowNumber={rowNumber} />
    )
  }

  return <table ref={tableRef}><tbody>{tableRows}</tbody></table>
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Sudoku App</title>
      </Head>

      <main>
        <SudokuTable />
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        table {
          border-collapse: collapse;
          margin: 10px auto;
          font-size: 2rem;
        }

        table input[inputmode="numeric"] {
          font-size: inherit;
          border: none;
          border-radius: 0;
          padding: 0;
          margin: 0;
          background: none;
          text-align: center;

          width: 100%;
          height: 100%;

          -moz-appearance: textfield;

          caret-color: transparent;

          cursor: default;
        }

        table input[inputmode="numeric"]:focus {
          outline: none;
          background-color: lightblue;
        }

        table input[inputmode="numeric"] ::selection {
          background-color: transparent;
        }

        table input[inputmode="numeric"]::-webkit-outer-spin-button,
        table input[inputmode="numeric"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        td {
          border: 1px solid black;
          width: 1.6em;
          height: 1.6em;
          overflow: hidden;
          text-align: center;
          padding: 0;
        }

        td:first-child {
          border-left: 3px solid black;
        }

        td:nth-child(3n) {
          border-right: 3px solid black;
        }

        tr:first-child {
          border-top: 3px solid black;
        }

        tr:nth-child(3n) {
          border-bottom: 3px solid black;
        }

        /* source: https://allyjs.io/tutorials/hiding-elements.html */
        .visually-hidden {
          position: absolute;

          width: 1px;
          height: 1px;
          margin: -1px;
          border: 0;
          padding: 0;

          clip: rect(0 0 0 0);
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
