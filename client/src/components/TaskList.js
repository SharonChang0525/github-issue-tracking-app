import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from "./TaskItem";


function TaskList() {
    const tasks = useSelector(state => state.tasks);
    const filter = useSelector(state => state.filter);

    useEffect(() => { 
      console.log("debug: render TaskList");

    }, [tasks])


  // scroll: https://upmostly.com/tutorials/react-infinite-scroll
  return (
    <div class="my-2">
      {
        tasks.filter(
            (item) => ((item.state === filter.filter || filter.filter === "all") && item.title.includes(filter.search))
          ).map((item) => 
          <TaskItem task={{...item}} />
        )
      }
    </div>
  )
}

export default TaskList;