import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

const backgroundStyle = {
    background: 'url(https://i.ytimg.com/vi/KcQOM0DQnME/maxresdefault.jpg) no-repeat',
    backgroundSize: 'cover',
    backgroundColor: 'transparent', // Define o fundo como transparente para que a imagem seja visível
    transition: 'background-color 300ms',
};

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center  pt-6 sm:pt-0 bg-gray-700" /*style={backgroundStyle}*/>
            <div>
                <Link href="">
                    <img
                        style={{
                            display: 'block',
                            WebkitUserSelect: 'none',
                            margin: 'auto',
                            cursor: 'zoom-in',
                            backgroundColor: 'hsl(0, 0%, 90%)',
                            transition: 'background-color 300ms',
                        }}
                    />
                    <ApplicationLogo className="fill-current text-gray-100" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-5 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
