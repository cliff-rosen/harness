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
    <div tyle={{ maxHeight: "50vh", overflowY: "auto" }}>
      {entries.map((e, i) => (
        <div key={i}>
          <Divider style={{ paddingTop: 10, paddingBottom: 10 }} />
          <div style={{ paddingTop: 10 }}>{e.content}</div>
        </div>
      ))}
      <Divider style={{ paddingTop: 10, paddingBottom: 10 }} />
    </div>
  );
}
