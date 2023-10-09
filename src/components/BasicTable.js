import React, {useMemo} from "react"
import {useTable} from 'react-table'
import {COLUMNS} from './columns'


export const BasicTable = () => {
   
    const updateWorkerList = () => {
        fetch("http://localhost:8080/workerlist")
          .then((response) => response.json())
          .then((data) => {
            setAppState({ workers: data });
          })
          .catch((error) => {
            console.error("Błąd w trakcie otrzymania listy pracowników:", error);
          });
      };
    
      useEffect(() => {
        const url = "http://localhost:8080/workerlist";
        fetch(url)
          .then((response) => response.json())
          .then((data) => setAppState({ workers: data }))
          .catch((error) => {
            console.error("Błąd w trakcie otrzymania listy pracowników:", error);
          });
      }, []);

      const columns = useMemo(() => COLUMNS, [])
      const data = useMemo(() => workers)
const tableInstance = useTable({
    columns,
     data
})

  
  
  return (<div>
<h1>asdas</h1>

  </div>)
};
