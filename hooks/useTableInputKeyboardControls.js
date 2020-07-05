import useKeydown from './useKeydown'

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

const useTableInputKeyboardControls = tableRef => {
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
}

export default useTableInputKeyboardControls
