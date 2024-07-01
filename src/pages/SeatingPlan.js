import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from './styles/SeatingPlanStyle.module.css';
import { AutoTextSize } from "auto-text-size";
import { Button } from "react-bootstrap";

const SeatingPlan = () => {
    const [dragItem, setDragItem] = useState(null);
    const [dragFromDiv, setDragFromDiv] = useState(null);
    const [dragFromIndex, setDragFromIndex] = useState(null);
    const [dragToDiv, setDragToDiv] = useState(null);
    const [dragToIndex, setDragToIndex] = useState(null);
    const [hoverDiv, setHoverDiv] = useState(null);

    const [participantList, setParticipantList] = useState({
        'Group1': [{ 'ItemName': 'Peter1' }, { 'ItemName': 'Mary1' }, { 'ItemName': 'Sam1' }],
        'Group2': [{ 'ItemName': 'Peter2' }, { 'ItemName': 'Mary2' }, { 'ItemName': 'Sam2' }],
        'Group3': [{ 'ItemName': 'Peter3' }, { 'ItemName': 'Mary3' }, { 'ItemName': 'Sam3' }],
        'Group4': [{ 'ItemName': 'Peter3' }, { 'ItemName': 'Mary3' }, { 'ItemName': 'Sam3' }]
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
            const sourceList = Array.from(participantList[dragFromDiv]);
            const origItem = sourceList[indexItem];

            sourceList[dragFromIndex] = origItem;
            sourceList[indexItem] = dragItem;

            setParticipantList({ ...participantList, [dragFromDiv]: sourceList });
        }
        else if (dragFromDiv !== indexDiv) {
            const sourceList = Array.from(participantList[dragFromDiv]);
            const targetList = Array.from(participantList[indexDiv]);

            sourceList.splice(dragFromIndex, 1);
            targetList.splice(indexItem, 0, dragItem);

            setParticipantList({ ...participantList, [dragFromDiv]: sourceList, [indexDiv]: targetList });
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

    function addDiv()
    {
        const newKey = `Group${Object.keys(participantList).length+1}`;
        setParticipantList(prevList => ({
            ...prevList,
            [newKey]: []
          }));
    }

    function deleteDiv(key)
    {
        setParticipantList(prevList => {
            const updatedList = { ...prevList };
            delete updatedList[key];
            return updatedList;
          });
    }

    return (
        <div className={styles.body}>
            <div className={styles.topRowContainer}>
                <Button size='sm' onClick={()=>{addDiv()}}>Add</Button>
            </div>

            <div className={styles.divContainer}>
                {Object.entries(participantList).map(([divKey, divItems]) => (
                    // RENDER ALL DIV CONTAINERS
                    <div
                        key={divKey}
                        className={styles.container}  
                        onDrop={() => { onDropDiv() }}
                        style={{'--divColor':hoverDiv == divKey ? '#EFF9FE' : '#F0F0F0'}}
                    >
                        {/* DIV CONTAINER HEADER */}
                        <div className={styles.containerHeader}>
                            {divKey}
                            <Button size="sm" variant="danger" onClick={()=>{deleteDiv(divKey)}}>Delete</Button>
                        </div>

                        {/* DIV CONTAINER ITEMS */}
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
                                <div style={{ width: '100%' }}>
                                    <AutoTextSize style={{ width: '100%' }} maxFontSizePx={14}>{`${itemIndex + 1}. ${item["ItemName"]}`}</AutoTextSize>
                                </div>
                            </div>
                        ))}
                        <div 
                            className={styles.lastItem}
                            key={divItems.length}
                            onDragOver={(e) => { onDragOverItem(divKey, divItems.length - 1, e) }}
                        >
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SeatingPlan;