import { useState } from "react";
import styles from './styles/DndListStyle.module.css';
import { Button, Fade } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ModalAddDiv from "./ModalAddDiv";
import ModalAddItem from "./ModalAddItem";
import NavMenu from "./NavMenu";

const DndMultipleGroupObjectFixSlot = () => {
    const [dragItem, setDragItem] = useState(null);
    const [dragFromDiv, setDragFromDiv] = useState(null);
    const [dragFromIndex, setDragFromIndex] = useState(null);
    const [hoverDiv, setHoverDiv] = useState(null);

    const [showAddNewGroupModal, setShowAddNewGroupModal] = useState(false);
    const [showAddNewItemModal, setShowAddNewItemModal] = useState(false);
    const [selectedGroupName, setSelectedGroupName] = useState('');

    const [inputValue, setInputValue] = useState('');

    const [dataList, setDataList] = useState({
        'Group1': [{ 'ItemName': 'iPhone' }, { 'ItemName': 'iPad' }, { 'ItemName': 'MacBook' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }],
        'Group2': [{ 'ItemName': 'Galaxy S24' }, { 'ItemName': 'Galaxy Tab' }, { 'ItemName': 'Galaxy Book' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }],
        'Group3': [{ 'ItemName': 'Mercedes' }, { 'ItemName': 'BMW' }, { 'ItemName': 'Audi' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }],
        'Group4': [{ 'ItemName': '10K' }, { 'ItemName': '50K' }, { 'ItemName': '100K' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }]
    });

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
            const sourceList = Array.from(dataList[dragFromDiv]);
            const origItem = sourceList[itemIndex];

            sourceList[dragFromIndex] = origItem;
            sourceList[itemIndex] = dragItem;

            setDataList({ ...dataList, [dragFromDiv]: sourceList });
        }
        else if (dragFromDiv !== divKey) {
            const sourceList = Array.from(dataList[dragFromDiv]);
            const targetList = Array.from(dataList[divKey]);

            sourceList[dragFromIndex] = { 'ItemName': '-' };
            targetList[itemIndex] = dragItem;
            
            setDataList({ ...dataList, [dragFromDiv]: sourceList, [divKey]: targetList });
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
        setDataList(prevList => {
            const updatedList = { ...prevList };
            delete updatedList[key];
            return updatedList;
          });
    }

    function deleteItem(divKey, itemIndex)
    {
        const newDataList = {...dataList};
        const oldArray = newDataList[divKey];
        oldArray[itemIndex] = {'ItemName':'-'};

        newDataList[divKey] = oldArray;
        setDataList(newDataList);
    }

    function addDiv()
    {
        if (inputValue in dataList == false && inputValue != '')
        {
            const newDataList = {...dataList};
            newDataList[inputValue] = [{ 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, 
                { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }, { 'ItemName': '-' }];
            setDataList(newDataList);
            setInputValue('');
            setShowAddNewGroupModal(false);
        }
    }

    function addItem()
    {
        const newDataList = {...dataList};
        const targetArray = newDataList[selectedGroupName];
        
        for (var i=0 ; i<targetArray.length ; i++)
        {
            if (targetArray[i]['ItemName'] == '-')
            {
                targetArray[i] = {'ItemName':inputValue};
                break;
            }
        }

        newDataList[selectedGroupName] = targetArray;
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
                <NavMenu selectedPage={'DND Multiple Group Fix Slot - Object'}/>
                <Button size='sm' style={{marginLeft:'5px'}} onClick={()=>{setShowAddNewGroupModal(true)}}>Add Group</Button>
            </div>

            <div className={styles.divContainer}>
                {Object.entries(dataList).map(([divKey, items]) => (
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

export default DndMultipleGroupObjectFixSlot;