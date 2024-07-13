import { Nav, NavDropdown } from "react-bootstrap";

const NavMenu = ({selectedPage}) => {
    return (
        <NavDropdown title={selectedPage} id="nav-dropdown">
            <NavDropdown.Item 
                style={{color:selectedPage=='DND Multiple Group - Array'?'blue':'black'}}
                href='./multipleGroupArray'
            >
                DND Multiple Group - Array
            </NavDropdown.Item>

            <NavDropdown.Item 
                style={{color:selectedPage=='DND Multiple Group Fix Slot - Array'?'blue':'black'}}
                href='./multipleGroupArrayFixSlot'
            >
                DND Multiple Group Fix Slot - Array
            </NavDropdown.Item>

            <NavDropdown.Item 
                style={{color:selectedPage=='DND Multiple Group - Object'?'blue':'black'}}
                href='./multipleGroupObject'
            >
                DND Multiple Group - Object
            </NavDropdown.Item>

            <NavDropdown.Item 
                style={{color:selectedPage=='DND Multiple Group Fix Slot - Object'?'blue':'black'}}
                href='./multipleGroupObjectFixSlot'
            >
                DND Multiple Group Fix Slot - Object
            </NavDropdown.Item>
        </NavDropdown>
    )
}

export default NavMenu;