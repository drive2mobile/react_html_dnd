import { useState } from "react";
import styles from './styles/DndListStyle.module.css';
import { Button, Fade } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import ModalAddDiv from "./ModalAddDiv";
import ModalAddItem from "./ModalAddItem";

const DndList = () => {
    const [dragItem, setDragItem] = useState(null);
    const [dragFromDiv, setDragFromDiv] = useState(null);
    const [dragFromIndex, setDragFromIndex] = useState(null);
    const [dragToDiv, setDragToDiv] = useState(null);
    const [dragToIndex, setDragToIndex] = useState(null);
    const [hoverDiv, setHoverDiv] = useState(null);

    const [showAddNewGroupModal, setShowAddNewGroupModal] = useState(false);
    const [showAddNewItemModal, setShowAddNewItemModal] = useState(false);
    const [selectedGroupName, setSelectedGroupName] = useState('');

    const [dataList, setDataList] = useState({
        'Group1': [{ 'ItemName': 'iPhone' }, { 'ItemName': 'iPad' }, { 'ItemName': 'MacBook' }],
        'Group2': [{ 'ItemName': 'Galaxy S24' }, { 'ItemName': 'Galaxy Tab' }, { 'ItemName': 'Galaxy Book' }],
        'Group3': [{ 'ItemName': 'Mercedes' }, { 'ItemName': 'BMW' }, { 'ItemName': 'Audi' }],
        'Group4': [{ 'ItemName': '10K' }, { 'ItemName': '50K' }, { 'ItemName': '100K' }]
    });

    function onDragStartItem(item, indexDiv, indexItem, event) {
        setDragItem(item);
        setDragFromDiv(indexDiv);
        setDragFromIndex(indexItem);

        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', event.target.innerHTML);
    }

    function onDragOverItem(indexDiv, indexItem, event) {
        event.preventDefault();
        setDragToDiv(indexDiv);
        setDragToIndex(indexItem);
        if (dragItem === null) return;

        if (dragFromDiv === indexDiv) {
            const sourceList = Array.from(dataList[dragFromDiv]);
            const origItem = sourceList[indexItem];

            sourceList[dragFromIndex] = origItem;
            sourceList[indexItem] = dragItem;

            setDataList({ ...dataList, [dragFromDiv]: sourceList });
        }
        else if (dragFromDiv !== indexDiv) {
            const sourceList = Array.from(dataList[dragFromDiv]);
            const targetList = Array.from(dataList[indexDiv]);

            sourceList.splice(dragFromIndex, 1);
            targetList.splice(indexItem, 0, dragItem);

            setDataList({ ...dataList, [dragFromDiv]: sourceList, [indexDiv]: targetList });
        }

        setDragFromDiv(indexDiv);
        setDragFromIndex(indexItem);
        setHoverDiv(indexDiv);
    }

    function onDropDiv() {
        console.log(`bench id: ${dragToDiv}`);
        console.log(`seat no: ${dragToIndex}`)

        setDragItem(null);
        setDragFromDiv(null);
        setDragFromIndex(null);
        setHoverDiv(null);
        setDragToDiv(null);
        setDragToIndex(null);
    }

    function onDragLeave()
    {
        setDragItem(null);
        setDragFromDiv(null);
        setDragFromIndex(null);
        setHoverDiv(null);
        setDragToDiv(null);
        setDragToIndex(null);
        console.log('end')
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
        oldArray.splice(itemIndex, 1);

        newDataList[divKey] = oldArray;
        setDataList(newDataList);
    }

    return (
        <div className={styles.body}>
            <ModalAddDiv showModal={showAddNewGroupModal} setShowModal={setShowAddNewGroupModal} dataList={dataList} setDataList={setDataList}/>
            <ModalAddItem showModal={showAddNewItemModal} setShowModal={setShowAddNewItemModal} dataList={dataList} setDataList={setDataList} groupName={selectedGroupName}/>

            <div className={styles.btnContainer}>
                <Button size='sm' onClick={()=>{setShowAddNewGroupModal(true)}}>Add Group</Button>
            </div>

            <div className={styles.divContainer}>
                {Object.entries(dataList).map(([divKey, divItems]) => (
                    // RENDER ALL DIV CONTAINERS
                    <Fade in={true} appear={true} style={{transitionDuration: '0.3s'}} className={styles.container} style={{'--divColor':hoverDiv == divKey ? '#EFF9FE' : '#F0F0F0'}}>
                        <div
                            key={divKey}
                            onDrop={() => { onDropDiv() }}
                            onDragEnd={() => { onDragLeave() }}
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
                            {divItems.length > 0 && divItems.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    draggable={true}
                                    onDragStart={(e) => { onDragStartItem(item, divKey, itemIndex, e) }}
                                    onDragOver={(e) => { onDragOverItem(divKey, itemIndex, e) }}
                                    className={styles.item}
                                    style={{
                                        '--itemColor': dragItem === item && dragFromDiv === divKey ? 'lightgreen' : '#B9DEFC',
                                        '--itemOpacity': dragItem === item && dragFromDiv === divKey ? '1' : '1',
                                    }}
                                >
                                    <div style={{ width: '80%' }}>
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
                                key={divItems.length}
                                onDragOver={(e) => { onDragOverItem(divKey, divItems.length - 1, e) }}
                            >
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    )
}

export default DndList;