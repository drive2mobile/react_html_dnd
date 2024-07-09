import { useState } from "react";
import styles from './styles/DndListStyle.module.css';
import { Button, Fade } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ModalAddDiv from "./ModalAddDiv";
import ModalAddItem from "./ModalAddItem";
import NavMenu from "./NavMenu";

const DndMultipleGroupArrayFixSlot = () => {
    const [dragItem, setDragItem] = useState(null);
    const [dragFromDiv, setDragFromDiv] = useState(null);
    const [dragFromIndex, setDragFromIndex] = useState(null);
    const [hoverDiv, setHoverDiv] = useState(null);

    const [showAddNewGroupModal, setShowAddNewGroupModal] = useState(false);
    const [showAddNewItemModal, setShowAddNewItemModal] = useState(false);
    const [selectedGroupName, setSelectedGroupName] = useState('');

    const [inputValue, setInputValue] = useState('');

    const [dataList, setDataList] = useState([
        [{ 'ItemName': 'iPhone' }, { 'ItemName': 'iPad' }, { 'ItemName': 'MacBook' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }],
        [{ 'ItemName': 'Galaxy S24' }, { 'ItemName': 'Galaxy Tab' }, { 'ItemName': 'Galaxy Book' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }],
        [{ 'ItemName': 'Mercedes' }, { 'ItemName': 'BMW' }, { 'ItemName': 'Audi' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }],
        [{ 'ItemName': '10K' }, { 'ItemName': '50K' }, { 'ItemName': '100K' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }]
    ]);

    function onDragStart(item, divKey, itemIndex, event) {
        setDragItem(item);
        setDragFromDiv(divKey);
        setDragFromIndex(itemIndex);

        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', event.target.innerHTML);
    }

    function onDragOver(divKey, itemIndex, event) {
        event.preventDefault();
        if (dragItem === null) return;

        if (dragFromDiv === divKey) {
            const newDataList = [...dataList];
            newDataList[dragFromDiv][dragFromIndex] = dataList[dragFromDiv][itemIndex];
            newDataList[dragFromDiv][itemIndex] = dragItem;

            setDataList(newDataList);
        }
        else if (dragFromDiv !== divKey) {
            const newDataList = [...dataList];
            newDataList[dragFromDiv][dragFromIndex] = { 'ItemName': '-' };
            newDataList[divKey][itemIndex] = dragItem;
            
            setDataList(newDataList);
        }

        setDragFromIndex(itemIndex);
        setDragFromDiv(divKey);
        setHoverDiv(divKey);
    }

    function onDragEnd() 
    {
        setDragItem(null);
        setDragFromDiv(null);
        setDragFromIndex(null);
        setHoverDiv(null);
    }

    function deleteDiv(key)
    {
        const newDataList = [...dataList];
        delete newDataList[key];
        setDataList(newDataList);
    }

    function deleteItem(divKey, itemIndex)
    {
        const newDataList = [...dataList];
        newDataList[divKey][itemIndex] = {'ItemName':'-'};
        setDataList(newDataList);
    }

    function addDiv()
    {
        if (inputValue in dataList == false && inputValue != '')
        {
            const newDataList = [...dataList];
            newDataList.push([{ 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, 
                { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }]);

            setDataList(newDataList);
            setInputValue('');
            setShowAddNewGroupModal(false);
        }
    }

    function addItem()
    {
        const newDataList = [...dataList];
        
        for (var i=0 ; i<newDataList[selectedGroupName].length ; i++)
        {
            if (newDataList[selectedGroupName][i]['ItemName'] == '-')
            {
                newDataList[selectedGroupName][i] = {'ItemName':inputValue};
                break;
            }
        }

        setDataList(newDataList);
        setInputValue('');
        setShowAddNewItemModal(false);
    }

    return (
        <div className={styles.body}>
            <ModalAddDiv 
                showModal={showAddNewGroupModal} 
                setShowModal={setShowAddNewGroupModal} 
                inputValue={inputValue} 
                setIputValue={setInputValue} 
                confirmFunction={addDiv} 
            />

            <ModalAddItem 
                showModal={showAddNewItemModal} 
                setShowModal={setShowAddNewItemModal} 
                inputValue={inputValue} 
                setIputValue={setInputValue} 
                confirmFunction={addItem} 
            />
            <div className={styles.btnContainer}>
                <NavMenu selectedPage={'DND Multiple Group Fix Slot - Array'}/>
                <Button size='sm' style={{marginLeft:'5px'}} onClick={()=>{setShowAddNewGroupModal(true)}}>Add Group</Button>
            </div>

            <div className={styles.divContainer}>
                {dataList.map((items, divKey) => (
                    // RENDER ALL DIV CONTAINERS
                    <Fade in={true} appear={true} style={{transitionDuration: '0.3s', '--divColor':hoverDiv == divKey ? '#EFF9FE' : '#F0F0F0'}} className={styles.container}>
                        <div
                            key={divKey}
                        >
                            {/* DIV HEADER */}
                            <div className={styles.containerHeader}>
                                {divKey}
                                <div style={{display:'flex', justifyContent:'row'}}>
                                    <Button 
                                        size="sm" 
                                        variant="primary" 
                                        className={styles.btnStyle} 
                                        onClick={()=>{
                                            setSelectedGroupName(divKey);
                                            setShowAddNewItemModal(true);
                                        }} >
                                        <Icon.Plus style={{margin:'auto', scale:'2'}}/>
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        variant="danger" 
                                        className={styles.btnStyle} 
                                        onClick={()=>{deleteDiv(divKey)}}
                                    >
                                        <Icon.Trash style={{margin:'auto', scale:'1.5'}}/>
                                    </Button>
                                </div>
                            </div>

                            {/* DIV ITEMS */}
                            {items.length > 0 && items.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    draggable={item["ItemName"] != '-'}
                                    onDragStart={(e) => {item["ItemName"] != '-' && onDragStart(item, divKey, itemIndex, e) }}
                                    onDragOver={(e) => { item["ItemName"] == '-' && onDragOver(divKey, itemIndex, e) }}
                                    onDragEnd={(e) => {onDragEnd()}}
                                    className={styles.item}
                                    style={{
                                        '--itemColor': dragItem === item && dragFromDiv === divKey ? 'lightgreen' : (item["ItemName"] == '-' ? '#E2E2E2' : '#B9DEFC'),
                                        '--itemOpacity': dragItem === item && dragFromDiv === divKey ? '1' : '1',
                                    }}
                                >
                                    <div>
                                        {`${itemIndex + 1}. ${item["ItemName"]}`}
                                    </div>
                                    <Button 
                                        size="sm" 
                                        variant="danger" 
                                        className={styles.btnSmallStyle} 
                                        onClick={()=>{deleteItem(divKey, itemIndex)}}
                                    >
                                        <Icon.Trash style={{margin:'auto', scale:'1.5'}}/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    )
}

export default DndMultipleGroupArrayFixSlot;