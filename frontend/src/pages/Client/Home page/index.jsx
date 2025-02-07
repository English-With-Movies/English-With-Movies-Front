import Helmet from 'react-helmet';
import HomeSwipper from '../../../components/Client/Home page components/Home Swipper';
import SeeMore from '../../../components/Client/Home page components/See More Series and Movies';

export default function HomePage() {
    // window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <Helmet>
                <title>English With Movies</title>
            </Helmet>
            <>
                {/* section 1 -> swipper slider */}
                <HomeSwipper />
                {/* section 2 -> movies and series */}
                <SeeMore />
            </>
        </>
    )
}