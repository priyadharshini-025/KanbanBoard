import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const AddTaskForm = () => {
  const { addTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    tags: '',
    deadline: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    addTask({
      ...formData,
      tags,
    });

    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      tags: '',
      deadline: '',
    });
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full rounded-[18px] bg-cyan-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-sky-700 hover:shadow-lg"
        >
          + Add New Task
        </button>
      ) : (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl mx-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 rounded-full p-2 transition bg-slate-100 text-slate-600"
            >
              ✕
            </button>

            <div className="mb-6 rounded-[20px] bg-sky-600 px-6 py-4 text-white">
              <h2 className="text-2xl font-semibold">Add New Task</h2>
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
                  placeholder="e.g. feature, urgent, new implementation"
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

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-[12px] bg-sky-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-sky-700 hover:shadow-lg"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-[12px] border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskForm;