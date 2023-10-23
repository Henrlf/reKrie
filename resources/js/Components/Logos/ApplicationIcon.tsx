import React, {SVGAttributes} from 'react';
import iconPng from '/image/RekrieIcon.png';

const ApplicationIcon: React.FC<SVGAttributes<SVGElement>> = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" className='w-12 h-10 justify-content-center'>
            <image x="0" y="0" width="50" height="40" xlinkHref={iconPng}/>
        </svg>
    );
}

export default ApplicationIcon;
