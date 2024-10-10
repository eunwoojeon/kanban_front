import React, { useMemo, useState } from 'react'
import PlusIcon from '../icons/PlusIcon'
import ColumnContainer from '../components/ColumnContainer';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const columnsId = useMemo(() => columns.map(column => column.id), [columns]);
  const [activeColumn, setActiveColumn] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10 // 드래그 이벤트 발생시키기 위한 드래드 이동 거리(10px)
      }
    })
  )
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

  const updateColumn = (id, title) => {
    const newColumns = columns.map(column => {
      if (column.id !== id) return column;
      return { ...column, title }
    });
    setColumns(newColumns);
  }

  const onDragStart = (e) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
    }
  }

  const onDragEnd = (e) => {
    const { active, over } = e;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(
        column => column.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        column => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
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
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className='flex gap-4 m-auto'>
          <div className='flex gap-4'>
            <SortableContext items={columnsId}>
              {columns.map((column, index) =>
                <ColumnContainer
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                />
              )}
            </SortableContext>
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
        {createPortal(
          <DragOverlay>
            {activeColumn &&
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
              />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default KanbanBoard