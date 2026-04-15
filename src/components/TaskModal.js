import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { FaTrash } from 'react-icons/fa';

const TaskModal = ({ task, onClose }) => {
  const { updateTask, deleteTask } = useTasks();
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority || 'medium',
    tags: task.tags ? task.tags.join(', ') : '',
    deadline: task.deadline || '',
  });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    updateTask({
      ...task,
      ...formData,
      tags,
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-[32px] bg-white shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="sticky top-6 right-6 float-right rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 z-10 bg-white"
        >
          ✕
        </button>

        <div className="p-8">
          <div className="mb-6 rounded-[20px] bg-sky-600 px-6 py-4 text-white">
            <h2 className="text-2xl font-semibold">Task Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
                className="w-full rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-500 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Add task details..."
                className="w-full rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-500 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. feature, urgent, bug"
                className="w-full rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-500 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <button
                type="submit"
                className="col-span-2 rounded-[12px] bg-sky-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-sky-700 hover:shadow-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-[12px] border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </form>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 rounded-[12px] bg-red-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-red-600 hover:shadow-lg"
            >
              <FaTrash size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default TaskModal;