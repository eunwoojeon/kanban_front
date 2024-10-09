import React, { useState } from 'react'
import PlusIcon from '../icons/PlusIcon'
import ColumnContainer from '../components/ColumnContainer';

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const createNewColumn = () => {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`
    };

    setColumns([...columns, columnToAdd]);
  }
  const generateId = () => {
    return Math.floor(Math.random() * 1000);
  }
  const deleteColumn = (id) => {
    const filteredColumns = columns.filter(column => column.id !== id);
    setColumns(filteredColumns);
  }

  return (
    <div
      className='
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
      '
    >
      <div className='flex gap-4 m-auto'>
        <div className='flex gap-4'>
          {columns.map((column, index) =>
            <ColumnContainer key={column.id} column={column} deleteColumn={deleteColumn} />
          )}
        </div>
        <button
          onClick={() => { createNewColumn() }}
          className='
            h-[60px]
            w-[350px]
            min-w-[350px]
            cursor-pointer
            rounded-lg
            bg-mainBackgroundColor
            border-2
            border-columnBackgroundColor
            p-4
            ring-rose-500
            hover:ring-2
            flex
            gap-2
          '
        >
          <PlusIcon />Add Column
        </button>
      </div>
    </div>
  )
}

export default KanbanBoard