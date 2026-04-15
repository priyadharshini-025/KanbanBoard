import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useTasks } from '../context/TaskContext';
import Column from './Column';
import AddTaskForm from './AddTaskForm';


const Board = () => {
  const { tasks, moveTask } = useTasks();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
    { id: 'done', title: 'Done', status: 'done' },
  ];

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // If dropping on a column
    if (columns.some(col => col.id === overId)) {
      const newStatus = columns.find(col => col.id === overId).status;
      moveTask(activeId, newStatus);
    }
  };
  // const handleDragEnd = (event) => {
  //   const { active, over } = event;

  //   if (!over) return;

  //   const activeId = active.id;
  //   const overId = over.id;

  //   // If dropping on a column
  //   if (columns.some(col => col.id === overId)) {
  //     const newStatus = columns.find(col => col.id === overId).status;
  //     moveTask(activeId, newStatus);
  //   }
  // };

  return (
    <div className="task-board-shell">
      <div className="max-w-6xl mx-auto">
        <div className="task-panel rounded-[32px] p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <div>
              <div className="flex justify-center ">
                <div className="flex items-center gap-4 text-purple-600 font-bold">

                  <span className="text-3xl">📋</span>

                  <h1 className="text-3xl font-semibold tracking-wide font-poppins">
                    Kanban Board
                  </h1>
                </div>
              </div>
              <h1 className="task-page-title mt-4 text-2xl sm:text-xl font-semibold tracking-tight text-slate-900">
                Organize your tasks with clarity.
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <AddTaskForm />
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {columns.map(column => (
                <Column
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  status={column.status}
                  tasks={tasks.filter(task => task.status === column.status)}
                />
              ))}
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default Board;