import React from 'react';
import { Subject } from '../../interfaces/Course';
import Image from '../Image';

interface SubjectDescriptionProps {
    subject: Subject | undefined;
}

const SubjectDescription: React.FC<SubjectDescriptionProps> = ({ subject }) => {
    if (!subject) {
        return <p style={{color: '#c2c2c2', fontSize: '13px', paddingBottom: '8px'}}>No subject selected</p>;
    }
    return (
        <div>
            <Image srcImg={subject?.image} rounded width='50px' height='50px'/>
            <h2>{subject?.subjectName}</h2>
            <p>{subject?.description}</p>
        </div>
    );
};

export default SubjectDescription;