import {useState} from "react";
import {Button, Collapse} from "react-bootstrap";

function TextCollapseDescription({description}) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button className="btn-dark"
                onClick={() => setOpen(!open)}
            >
                <stong>Read Description</stong>
            </Button>
            <Collapse in={open}>
                <div id="textCollapseDescription">
                    {description}
                </div>
            </Collapse>
        </div>
    );
}

export default TextCollapseDescription;