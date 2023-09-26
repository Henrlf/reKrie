import React from 'react';

interface ProductCardProps {
    title: string;
    price: string;
    description: string;
    imageUrl: string;
    link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     title,
                                                     price,
                                                     description,
                                                     imageUrl,
                                                     link,
                                                 }) => {
    return (
        <a
            href={link}
            className="scale-100 p-6 bg-white from-gray-700/50 via-transparent rounded-lg shadow-2xl shadow-gray-500/20 flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-green-700"
        >
            <div>
                <div className="h-40 w-40 bg-green-900/20 flex items-center justify-center rounded-full">
                    <img src={imageUrl} alt="Product image"/>
                </div>

                <div className="flex justify-between">
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">
                        {title}
                    </h2>
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">
                        {price}
                    </h2>
                </div>

                <p className="mt-4 text-gray-500 text-sm text-justify leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Arrow right */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="self-center shrink-0 stroke-green-800 w-6 h-6 mx-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
            </svg>
        </a>
    );
};

export default ProductCard;
