import {fetchGet} from "../utils/APIUtils"
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";

export default function List() {

    const [entries, setEntries] = useState([])

    useEffect(() => {
        console.log("useEffect -> Main");
    
        const getEntries = async () => {
          const res = await fetchGet("entries");
          setEntries(res.data);
        };
    
        getEntries();
      }, []);

  return (
    <div style={{ maxHeight: "50vh", maxWidth: "70vw", overflowY: "auto" }}>
      {entries.map((e) => (
        <div key={e.entry_id}>
          <Divider style={{ paddingTop: 5, paddingBottom: 5 }} />
          <div style={{ paddingTop: 5, paddingBottom: 0, display: 'flex' }}>
            <div style={{flex: "0 0 200px"}}>{e.date_time_added}</div>
            <div style={{}}>{e.content}</div>
           </div>
        </div>
      ))}
      <Divider style={{ paddingTop: 5, paddingBottom: 5 }} />
    </div>
  );
}
