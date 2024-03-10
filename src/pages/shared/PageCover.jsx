import { Parallax, Background } from 'react-parallax';

const PageCover = ({img, title, description}) => {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="the bg"
            strength={-200}
            className='mb-20'
        >
            <div className="hero h-[400px] my-[100px] mx-auto max-w-[120vh]" >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                    <p className="mb-5">{description}</p>
                    </div>
                </div>
            </div>
            
        </Parallax>
    );
};

export default PageCover;