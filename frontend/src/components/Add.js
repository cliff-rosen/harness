import { useState, useEffect, useRef } from "react";
import { fetchGet, fetchPost } from "../utils/APIUtils";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

export default function Add({sessionManager}) {
    const [content, setContent] = useState("")

    const formSubmit = async (e) => {
        e.preventDefault();
        const data = {content}
        await fetchPost('entries', data)
        setContent('')
        sessionManager.setSessionMessageWrapper("Entry submitted");
    }

    return (
        <Box
            component="form"
            maxWidth={800}
            onSubmit={formSubmit}
            sx={{ mt: 1, margin: "auto" }}
        >
            <FormControl fullWidth>
                <div style={{ display: "flex" }}>
                    <div style={{ flexGrow: 1, paddingRight: 10 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="content"
                            type="text"
                            multiline
                            minRows={4}
                            label=""
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            variant="outlined"
                            required
                        />
                    </div>
                    <div style={{}}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 20 }}
                        >
                            send
                        </Button>
                    </div>
                </div>
            </FormControl>
        </Box>)
}