import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const Column = ({ id, title, status, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const headerStyle = {
    todo: 'bg-sky-500 text-white',
    'in-progress': 'bg-orange-500 text-white',
    done: 'bg-emerald-500 text-white',
  };

    const backgroundStyle = {
    todo: 'bg-blue-50',
    'in-progress': 'bg-orange-50',
    done: 'bg-green-50',
  };

  return (
    <div className={`${backgroundStyle[status]} rounded-xl p-4 min-h-[300px] shadow`}>
      <div className={`rounded-3xl px-4 py-3 mb-5 flex items-center justify-between ${headerStyle[status]}`}>
        <h2 className="text-lg font-semibold">{title}</h2>
        {/* <span className="bg-white px-2 py-1 rounded-full text-sm">
          {tasks.length}
        </span> */}
      </div>

      <div ref={setNodeRef} className="space-y-4 min-h-[420px]">
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;