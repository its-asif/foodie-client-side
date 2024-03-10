
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='text-center mb-10'>
            <p className='text-[#D99904] text-sm italic line'>---{subHeading}---</p>

            <h1 className='text-4xl uppercase font-bold border-4 w-fit mx-auto p-6 border-x-0 mt-5'>{heading}</h1>
        </div>
    );
};

export default SectionTitle;