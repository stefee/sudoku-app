import Head from 'next/head'

const SudokuCell = ({ id, label, digit }) => {
  const cellId = `sudoku-cell-${id}`;

  return (
    <td>
      <label htmlFor={cellId} className="visually-hidden">
        {label}
      </label>
      <input
        id={cellId}
        name={cellId}
        type="number"
        value={digit}
        max={9}
        min={1}
      />
    </td>
  );
};

const SudokuTableRow = ({ rowNumber }) => {
  const cells = [];

  for (const columnNumber of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    const cellId = `r${rowNumber}c${columnNumber}`;
    const cellLabel = cellId.toUpperCase();

    cells.push(
      <SudokuCell
        key={columnNumber}
        id={cellId}
        label={cellLabel}
      />
    )
  }

  return <tr>{cells}</tr>;
};

const SudokuTable = () => {
  const tableRows = [];

  for (const rowNumber of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    tableRows.push(
      <SudokuTableRow key={rowNumber} rowNumber={rowNumber} />
    )
  }

  return <table><tbody>{tableRows}</tbody></table>;
};

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

        td {
          border: 1px solid black;
          width: 1.6em;
          height: 1.6em;
          overflow: hidden;
          text-align: center;
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
