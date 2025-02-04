import Container from 'react-bootstrap/Container';

export default function UserProfile() {

    return (
        <div className='user-profile py-5 bg-[var(--bg-color)] text-[var(--text-color)]'>
            <Container>
                <div className='grid grid-cols-[1fr_2fr_2fr] gap-[50px]'>
                    <div>
                        <div className=''>
                            <img className='w-full' src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="" />
                        </div>
                        <div>Namenamename Fullnamefullnamedullname</div>
                        <div>
                            about about about about about about about about about about about about about about about about about about about about about
                        </div>
                    </div>

                    <div>
                        <div className='w-full h-[400px] bg-lime-400'>

                        </div>
                    </div>
                    <div>
                        <div className='flex'>
                            <div className='w-[50%]'>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Azerbaijan_Premier_League_trophy_2011-2012.jpg/180px-Azerbaijan_Premier_League_trophy_2011-2012.jpg" alt="" />
                            </div>
                            <div className='w-[50%]'>
                                <img src="https://png.pngtree.com/png-clipart/20220921/original/pngtree-fire-logo-png-image_8625285.png" alt="" />
                                <h4>STREAK 500GUN</h4>
                            </div>
                        </div>
                        <div className='p-3 bg-orange-300 my-1'>
                            <h4>Bildiyiniz sozler</h4>
                        </div>
                        <div className='flex justify-between items-center'>
                            <h4 className='p-3 bg-emerald-500'>Burda qalmisiniz</h4>
                            <h4 className='p-3 bg-emerald-500'>PREMIUM OL!</h4>
                        </div>
                    </div>
                </div>


            </Container>

        </div>
    )
}