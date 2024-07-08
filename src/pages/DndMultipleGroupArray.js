import { useState } from "react";
import styles from './styles/DndListStyle.module.css';
import { Button, Fade } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ModalAddDiv from "./ModalAddDiv";
import ModalAddItem from "./ModalAddItem";

const DndMultipleGroupArray = () => {
    const [dragItem, setDragItem] = useState(null);
    const [dragFromDiv, setDragFromDiv] = useState(null);
    const [dragFromIndex, setDragFromIndex] = useState(null);
    const [hoverDiv, setHoverDiv] = useState(null);

    const [showAddNewGroupModal, setShowAddNewGroupModal] = useState(false);
    const [showAddNewItemModal, setShowAddNewItemModal] = useState(false);
    const [selectedGroupName, setSelectedGroupName] = useState('');

    const [inputValue, setInputValue] = useState('');

    const [dataList, setDataList] = useState([
        [{ 'ItemName': 'iPhone' }, { 'ItemName': 'iPad' }, { 'ItemName': 'MacBook' }],
        [{ 'ItemName': 'Galaxy S24' }, { 'ItemName': 'Galaxy Tab' }, { 'ItemName': 'Galaxy Book' }],
        [{ 'ItemName': 'Mercedes' }, { 'ItemName': 'BMW' }, { 'ItemName': 'Audi' }],
        [{ 'ItemName': '10K' }, { 'ItemName': '50K' }, { 'ItemName': '100K' }]
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
            const sourceList = dataList[dragFromDiv];
            const origItem = sourceList[itemIndex];

            if (itemIndex == sourceList.length)
            {
                sourceList[dragFromIndex] = origItem;
                sourceList[sourceList.length-1] = dragItem;
                setDragFromIndex(sourceList.length-1);
            }
            else
            {
                sourceList[dragFromIndex] = origItem;
                sourceList[itemIndex] = dragItem;
                setDragFromIndex(itemIndex);
            }

            const newDataList = [...dataList];
            newDataList[dragFromDiv] = sourceList;
            setDataList(newDataList);
        }
        else if (dragFromDiv !== divKey) {
            const sourceList = dataList[dragFromDiv];
            const targetList = dataList[divKey];

            if (itemIndex == targetList.length)
            {
                sourceList.splice(dragFromIndex, 1);
                targetList.push(dragItem);
                setDragFromIndex(itemIndex);
            }
            else
            {
                sourceList.splice(dragFromIndex, 1);
                targetList.splice(itemIndex, 0, dragItem);
                setDragFromIndex(itemIndex);
            }
            
            const newDataList = [...dataList];
            newDataList[dragFromDiv] = sourceList;
            newDataList[divKey] = targetList;
            setDataList(newDataList);
        }

        setDragFromDiv(divKey);
        setHoverDiv(divKey);
    }

    function onDropDiv() 
    {
        setDragItem(null);
        setDragFromDiv(null);
        setDragFromIndex(null);
        setHoverDiv(null);
    }

    function deleteDiv(key)
    {
        const newDataList = [...dataList];
        newDataList.splice(key, 1);
        setDataList(newDataList);
    }

    function deleteItem(divKey, itemIndex)
    {
        const newDataList = [...dataList];
        const oldArray = newDataList[divKey];
        oldArray.splice(itemIndex, 1);

        newDataList[divKey] = oldArray;
        setDataList(newDataList);
    }

    function addDiv()
    {
        const newDataList = [...dataList];
        const newArray = [];
        newDataList.push(newArray);
        setDataList(newDataList);
        setInputValue('');
        setShowAddNewGroupModal(false);
    }

    function addItem()
    {
        const newDataList = [...dataList];
        newDataList[selectedGroupName].push({ 'ItemName': inputValue });
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
                <span style={{fontSize:'22px'}}>DND Multiple Group - Array</span>
                <Button size='sm' style={{marginLeft:'5px'}} onClick={()=>{setShowAddNewGroupModal(true)}}>Add Group</Button>
            </div>

            <div className={styles.divContainer}>
                {dataList.map((items, divKey) => (
                    // RENDER ALL DIV CONTAINERS
                    <Fade in={true} appear={true} style={{transitionDuration: '0.3s', '--divColor':hoverDiv == divKey ? '#EFF9FE' : '#F0F0F0'}} className={styles.container}>
                        <div
                            key={divKey}
                            onDrop={() => { onDropDiv() }}
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
                                    draggable={true}
                                    onDragStart={(e) => { onDragStart(item, divKey, itemIndex, e) }}
                                    onDragOver={(e) => { onDragOver(divKey, itemIndex, e) }}
                                    className={styles.item}
                                    style={{
                                        '--itemColor': dragItem === item && dragFromDiv === divKey ? 'lightgreen' : '#B9DEFC',
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
                            <div 
                                className={styles.lastItem}
                                key={items.length}
                                onDragOver={(e) => { onDragOver(divKey, items.length, e) }}
                            >
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    )
}

export default DndMultipleGroupArray;