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

const findParentByTagName = (element, tagName) => {
  let el = element
  while (el.parentElement) {
    el = el.parentElement
    if (el.tagName === tagName) {
      return el
    }
  }
  return null
}

const getNextCell = ({
  currentInputElement,
  getNextCellRowNumber,
  getNextCellColumnNumber,
}) => {
  const tableCellElement = findParentByTagName(currentInputElement, 'TD')
  const tableBodyElement = findParentByTagName(currentInputElement, 'TBODY')

  if (!tableCellElement) {
    console.error('Could not find table cell element for current input')
    return null
  }

  if (!tableBodyElement) {
    console.error('Could not find table body element for current input')
    return null
  }

  const cellColumnNumber = parseInt(tableCellElement.getAttribute('data-sudoku-cell-column-number'), 10)
  const cellRowNumber = parseInt(tableCellElement.getAttribute('data-sudoku-cell-row-number'), 10)

  if (typeof cellColumnNumber !== 'number') {
    console.error('Could not find current column number')
    return null
  }

  if (typeof cellRowNumber !== 'number') {
    console.error('Could not find current row number')
    return null
  }

  const nextCellRowNumber = getNextCellRowNumber ? getNextCellRowNumber(cellRowNumber) : cellRowNumber
  const nextCellColumnNumber = getNextCellColumnNumber ? getNextCellColumnNumber(cellColumnNumber) : cellColumnNumber

  const nextCell = tableBodyElement.querySelector(`td[data-sudoku-cell-column-number="${nextCellColumnNumber}"][data-sudoku-cell-row-number="${nextCellRowNumber}"] input`)

  if (!nextCell) {
    console.error('Could not find next cell')
    return null
  }

  return nextCell
}

const SudokuTableCell = ({ rowNumber, columnNumber }) => {
  const sudokuCellId = `r${rowNumber}c${columnNumber}`
  const sudokuCellReadableLabel = sudokuCellId.toUpperCase()
  const inputId = `sudoku-cell-${sudokuCellId}`

  return (
    <td data-sudoku-cell-row-number={rowNumber} data-sudoku-cell-column-number={columnNumber}>
      <label htmlFor={inputId} className="visually-hidden">
        {sudokuCellReadableLabel}
      </label>
      <input
        id={inputId}
        name={inputId}
        type="text"
        inputMode="numeric"
        pattern="[0-9]"
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
      const nextCell = getNextCell({
        currentInputElement: document.activeElement,
        getNextCellColumnNumber: currentCellColumnNumber => (currentCellColumnNumber % 9) + 1,
      })
      if (nextCell) {
        nextCell.focus()
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
      const nextCell = getNextCell({
        currentInputElement: document.activeElement,
        getNextCellColumnNumber: currentCellColumnNumber => 9 - ((10 - currentCellColumnNumber) % 9),
      })
      if (nextCell) {
        nextCell.focus()
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
      const nextCell = getNextCell({
        currentInputElement: document.activeElement,
        getNextCellRowNumber: currentCellRowNumber => (currentCellRowNumber % 9) + 1,
      })
      if (nextCell) {
        nextCell.focus()
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
      const nextCell = getNextCell({
        currentInputElement: document.activeElement,
        getNextCellRowNumber: currentCellRowNumber => 9 - ((10 - currentCellRowNumber) % 9),
      })
      if (nextCell) {
        nextCell.focus()
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

const Home = () => {
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

export default Home
