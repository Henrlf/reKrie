import React, { SVGAttributes } from 'react';
import logoPng from '/image/Logo.png';

const ApplicationLogo: React.FC<SVGAttributes<SVGElement>> = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg">
            <image x="0" y="0" width="300" height="150" xlinkHref={logoPng} />
        </svg>
    );
}

export default ApplicationLogo;
