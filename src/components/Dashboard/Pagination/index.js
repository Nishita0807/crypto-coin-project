import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import "./styles.css";
export default function PaginationComponent({page,handlePageChange}) {
  

  return (
    <div className="pagination" spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={(e,v)=>handlePageChange(e,v)} 
      sx={{
        color:"var(--white)",
        "& .Mui-selected": {
            backgroundColor:"var(--blue) !important",
            color:"#fff !important",
            borderColor:"var(--blue) !important",
        },
        "& .MuiPaginationItem-ellipsis":{
            border:"0px solid var(--grey) !important",
        },

        "& .MuiPaginationItem-text":{
            color:"var(--white)",
            border:"1px solid var(--grey",

        }

      }}
      
      />
    </div>
  );
}