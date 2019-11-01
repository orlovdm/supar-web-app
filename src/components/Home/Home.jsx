import React from "react"
import {
    Pagination,
} from '@storaensods/seeds-react';

const Home = () => {
    return (
        <>
            <Pagination handlePageClick={(e) => { return console.log(e.selected); }}
                        marginPagesDisplayed={3}
                        pageCount={10}
                        pageRangeDisplayed={2}/>
        </>
    )
}

export default Home;