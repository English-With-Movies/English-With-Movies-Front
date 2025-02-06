import Container from "react-bootstrap/esm/Container";

export default function MoviesDetail() {

    return (
        <div className="movies-page py-3 bg-[var(--bg-color)] text-white">
            <Container>
                <div className="text-[var(--text-color)]">
                    <div className='bg-[var(--movies-bg)] relative my-0 mx-[auto] max-w-[1320px] height-[500px] w-full'>
                        <img style={{ objectFit: "cover", objectPosition: "center" }}
                            src="https://www.theforgemovie.com/images/share.jpg" alt="" className="w-full" />
                        <div className="overlay"></div>
                    </div>
                    <div className="my-0 mx-[auto] max-w-[1200px] flex gap-10 ">
                        <div className="max-w-[200px] w-full -mt-7 ml-7 relative z-index-2">
                            <img src="https://diziyleogren.com/img/interstellar.d95f5b93.jpg" alt="" />
                        </div>
                        <div className="text-[var(--text-color)] w-full">
                            <div className="flex"><h3>Interstellar</h3> <span className="px-2 bg-lime-500">KOLAY</span></div>
                            <div>(IMDB:9.9) ❤️</div>

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore consectetur, impedit facilis fuga nisi odio ullam erit impedit molestiae inventore in?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore consectetur, impedit facilis fuga nisi odio ullam dolorum eveniet excepturi asperiores fugiat repellat tempora sit sunt ea similique eaque? Unde dolore vitae recusandae quam nam distinctio fuga voluptatum earum libero. Nobis, repudiandae atque, excepturi possimus veniam qui alias quo aspernatur neque, itaque molestias impedit exercitationem. Dolor cupiditate accusantium vero excepturi provident impedit ullam maxime ipsam accusamus cumque incidunt laboriosam fugit natus assumenda laudantium voluptatem hic illo nobis, non voluptatibus fugiat quia! Magnam illum, nulla beatae totam dolorum distinctio! Earum velit nesciunt, ex, aliquid, temporibus ipsam a reprehenderit impedit molestiae inventore in?</p>

                        </div>

                    </div>

                </div>

            </Container>
        </div>
    )
}