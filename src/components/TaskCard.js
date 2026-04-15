import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTasks } from '../context/TaskContext';
import { TaskModal } from './TaskModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();
  const [showModal, setShowModal] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Delete this task?")) {
      deleteTask(task.id.toString());
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-emerald-500';
      default: return 'bg-slate-400';
    }
  };

  const getTagColor = (index) => {
    const colors = [
      'bg-amber-50 text-amber-700',
      'bg-blue-50 text-blue-700',
      'bg-emerald-50 text-emerald-700',
      'bg-purple-50 text-purple-700',
      'bg-pink-50 text-pink-700',
      'bg-orange-50 text-orange-700',
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        onClick={() => setShowModal(true)}
        className={`rounded-[26px] border border-slate-200 bg-white/95 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${isDragging ? 'opacity-60' : ''
          } cursor-pointer`}
      >
        
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="text-base font-semibold leading-snug text-slate-900">{task.title}</h3>
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <FaEdit size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="rounded-full p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
            >
              <FaTrash size={14} />
            </button>
          </div>
        </div>

        <div
          {...listeners}
          onClick={() => setShowModal(true)}
          className="cursor-grab active:cursor-grabbing"
        >
          <p className="text-slate-600 text-sm mb-4 max-h-[4.5rem] overflow-hidden text-ellipsis whitespace-pre-wrap">{task.description || 'No description added yet.'}</p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {task.priority && (
              <span className={`inline-flex items-center justify-center rounded-full px-2 py-1 font-semibold text-white ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            )}
            {task.deadline && (
              <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-2 py-1 text-slate-700">
                Due {new Date(task.deadline).toLocaleDateString()}
              </span>
            )}
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {task.tags.map((tag, index) => (
                <span key={index} className={`rounded-full px-3 py-1 text-xs font-medium ${getTagColor(index)}`}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <TaskModal 
          task={task} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

export default TaskCard;