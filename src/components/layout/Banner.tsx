
import bannerImage from '../../assets/banner.jpg'

const Banner = () => {
    return (
        <div>
            <img src={bannerImage} alt="Library..." className='rounded-lg mb-10' />
        </div>
    );
};

export default Banner;