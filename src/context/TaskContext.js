import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const data = localStorage.getItem('kanban-tasks');
    if (!data) return [];
    try {
      return JSON.parse(data).map(task => ({
        ...task,
        id: task.id?.toString(),
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks(prev => [
      ...prev,
      {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const updateTask = (updatedTask) => {
    setTasks(prev =>
      prev.map(t =>
        t.id.toString() === updatedTask.id.toString()
          ? { ...t, ...updatedTask, id: t.id }
          : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id.toString() !== id.toString()));
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(t =>
        t.id.toString() === taskId.toString() ? { ...t, status: newStatus } : t
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};