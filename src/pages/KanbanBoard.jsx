import React, { useEffect, useMemo, useState } from 'react'
import PlusIcon from '../icons/PlusIcon'
import ColumnContainer from '../components/ColumnContainer';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import TaskCard from '../components/TaskCard';

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const columnsId = useMemo(() => columns.map(column => column.id), [columns]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10 // 드래그 이벤트 발생시키기 위한 드래드 이동 거리(10px)
      }
    })
  )

  const createTask = (columnId) => {
    const newTask = {
      id: generateId(),
      columnId: columnId,
      content: `Task ${tasks.length + 1}`
    }
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  const updateTask = (id, content) => {
    const newTasks = tasks.map(task => {
      if (task.id !== id) return task;
      return { ...task, content };
    })

    setTasks(newTasks);
  }

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

    const newTasks = tasks.filter(task => task.columnId !== id);
    setTasks(newTasks);
  }

  const updateColumn = (id, title) => {
    const newColumns = columns.map(column => {
      if (column.id !== id) return column;
      return { ...column, title }
    });
    setColumns(newColumns);
  }

  // drag 이벤트
  const onDragStart = (e) => {
    // column event
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }

    // task event
    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  }

  // drop 이벤트
  const onDragEnd = (e) => {
    // active 요소 초기화
    setActiveColumn(null);
    setActiveTask(null);

    // active : drag 요소
    // over : 종료 시점 커서가 올려져있는 요소
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(
        column => column.id === activeId
      );

      const overColumnIndex = columns.findIndex(
        column => column.id === overId
      );

      // 이동) array 상의 두 아이템을 변경
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    })
  }

  // 기존 또는 다른 컨테이너 위로 drag시 이벤트
  const onDragOver = (e) => {
    const { active, over } = e;
    if (!over) return;
    console.log(over);

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // task event
    const isActiveTask = active.data.current?.type === 'Task';
    if (!isActiveTask) return;
    
    // active task를 task 위로 over시
    const isOverTask = over.data.current?.type === 'Task';
    if (isActiveTask && isOverTask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(
          task => task.id === activeId
        );
        const overIndex = tasks.findIndex(
          task => task.id === overId
        );

        // 이동
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }
    
    // active task를 column 위로 over시
    const isOverColumn = over.data.current?.type === "Column";
    if (isActiveTask && isOverColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(
          task => task.id === activeId
        );

        // 이동) column은 수정하나 array 상의 이동은 없음
        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <div
      className='m-auto flex min-h-screen w-full items-center
      justify-center overflow-x-auto overflow-y-hidden px-[40px]
      bg-black text-white box-border'
    >
      {/* 
      DndContext : dnd 구성요소가 서로 상호 작용하기 위해 DndContext 선언
        sensors : drag 작업을 시작/종료하기 위해 입력 방법을 감지
        onDragStart : sensor의 active조건 충족시 이벤트(드래그 요소 id 포함)
        onDragEnd : 드래그 요소가 drop된 후 이벤트(드롭가능 여부, 드래그 요소 id 포함)
        onDragOver : 드래그 요소를 컨테이너 위로 옮길 때 발생(컨테이너 id 포함)
      */}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className='flex gap-4 m-auto'>
          <div className='flex gap-4'>
            {/* SortableContext : drag&drop뿐 아니라 구성요소간 정렬 기능 제공 */}
            <SortableContext items={columnsId}>
              {columns.map((column, index) =>
                <ColumnContainer
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter(task => task.columnId === column.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </SortableContext>
          </div>
          <button
            onClick={() => { createNewColumn() }}
            className='h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg
            bg-mainBackgroundColor border-2 border-columnBackgroundColor
            p-4 ring-rose-500 hover:ring-2 flex gap-2'
          >
            <PlusIcon />Add Column
          </button>
        </div>
        {/* 
        createPortal : 자식을 다른 부모 아래에 렌더링(react내장함수)
        DragOverlay : 드래그되는 요소를 렌더링하는 방법 제공(overlay rendering)
         */}
        {createPortal(
          <DragOverlay>
            {activeColumn &&
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />}
            {activeTask &&
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default KanbanBoard