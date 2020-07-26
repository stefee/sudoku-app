import { useRef, useEffect } from 'react'
import Head from 'next/head'
import useKeydown from '../hooks/useKeydown'
import useTableInputKeyboardControls from '../hooks/useTableInputKeyboardControls'

const sudokuCellInputPattern = '[0-9]'
const sudokuCellInputPatternRegExp = new RegExp(`^${sudokuCellInputPattern}$`)

const SudokuTableCell = ({ rowNumber, columnNumber }) => {
  const sudokuCellReadableLabel = `R${rowNumber}C${columnNumber}`

  const inputRef = useRef(null)

  useEffect(() => {
    const onTableCellInputKeydown = event => {
      if (!event.metaKey) {
        event.preventDefault()
      }

      if (sudokuCellInputPatternRegExp.test(event.key)) {
        if (!event.target.disabled) {
          event.target.value = event.key
        }
      }
    }

    const onTableCellInputPaste = event => {
      if (!event.metaKey) {
        event.preventDefault()
      }

      const clipboardText = event.clipboardData.getData('text')

      if (sudokuCellInputPatternRegExp.test(clipboardText)) {
        if (!event.target.disabled) {
          event.target.value = clipboardText
        }
      }
    }

    if (
      inputRef.current &&
      inputRef.current.addEventListener
    ) {
      inputRef.current.addEventListener('keydown', onTableCellInputKeydown)
      inputRef.current.addEventListener('paste', onTableCellInputPaste)
    }

    return () => {
      if (
        inputRef.current &&
        inputRef.current.removeEventListener
      ) {
        inputRef.current.removeEventListener('keydown', onTableCellInputKeydown)
        inputRef.current.removeEventListener('paste', onTableCellInputPaste)
      }
    }
  }, [])

  return (
    <td data-sudoku-cell-row-number={rowNumber} data-sudoku-cell-column-number={columnNumber}>
      <input
        ref={inputRef}
        aria-label={sudokuCellReadableLabel}
        type="text"
        inputMode="numeric"
        pattern={sudokuCellInputPattern}
        autoComplete="off"
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

  useTableInputKeyboardControls(tableRef)

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
      `}</style>
    </div>
  )
}

export default Home
