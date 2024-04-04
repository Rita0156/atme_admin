

import React, { useEffect } from "react";
import { useState } from "react";

import {
  
    useParams,
   useSearchParams,
} from "react-router-dom";
// material
import {
  
  Box,
  Switch,
} from "@mui/material";
import MUIDataTable from "mui-datatables";

import { useNavigate } from 'react-router-dom';
import AddnewRowTable from "../../components/addTablerow.js";

// import { useDispatch, useSelector } from "react-redux";
import DeleteEditeTableTooltip from "../../components/updateAndDelete/index.js";
import axios from "axios";

export default function QuizzesByCategory({ props }) {
  const csvLinkRef = React.useRef(null);
  const name = useParams()
//   console.log(name,'params');
  const [value, setValue] = useState(0);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [page, setPage] = useState(0);
  const [quizData,setQuizdata]= useState([]);
  const navigate = useNavigate()
  // const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const formateParams = Object.fromEntries(searchParams);

  
  const {
    organization_id: organization,
    office_id: ofcId,
    user_id: userId,
  } = formateParams;


const getData =async () => {
  const {data} =await  axios.get('https://atme-quiz.onrender.com/api/contests/category/'+`${ name.id }`)
  setQuizdata(data)
}

useEffect(()=>{
  getData()
},[])

  const handleDelete = async (id) => {
    try {
     
    } catch (error) {
    } finally {
      setIsDeleteConfirmed(false);
    }
  };
  
 

  React.useEffect(() => {
    if (isDeleteConfirmed) {
      handleDelete(deleteData);
    }
  }, [isDeleteConfirmed]);

  React.useEffect(() => {
    if (ofcId) {
      setValue(1);
    }
  }, [searchParams, organization]);

  const columns = [
    {
      name: "id",
      label: "id",
      display : true,
      options: {
        filter: false,
        display: quizData._id,

        viewColumns: false,
        customBodyRender: (value) => value,
      },
    },
    {
      name: "quizImage",
      label: "Contests",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { width: "150px" } }),

        customBodyRender: (value) => {
          return (
            <Box>
              <img src={value} />
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "Category Name",
      display: true,
      options: {
        filter: false,
        sort: true,

        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    

    {
      name: "winningCoins",
      label: "Contest Name",
      display: true,
      options: {
        filter: true,
        sort: true,
        // view?.state,
        customBodyRender: (value) => 'Play and Win '+ value,
      },
    },
    
    
    {
      name: "Actions",
      label: "Actions",
      options: {
        onRowClick: false,
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
        }),
        filter: false,
        empty: true,
        display: true,
        viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
           
          return (
            
              <DeleteEditeTableTooltip productDetails={quizData} tableMeta={tableMeta} />
          );
        },
      },
    },
  ];

  const handlePageChange = (action, page) => {
    if (action === "changePage") {
      setPage(page);
    }
  };

  const handleDownload = () => {
    if (csvLinkRef.current) {
      csvLinkRef.current.link.click();
    }
  };

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    onRowClick: (rowData) => {
      navigate(`/product/${rowData[0]}`)
    },

    onViewColumnsChange: (changedColumn, action) => {},
    page: page,
    onTableChange: (action, tableState) => {
      handlePageChange(action, tableState.page);
    },
    setRowProps: (row) => {
      return { style: { height: "75px" } };
    },
    onDownload: (buildHead, buildBody, columns, data) => {
      handleDownload();
      return false;
    },
  };

  return (
    <Box>
     
        <>
          <AddnewRowTable />

          <MUIDataTable
            title={"Category Wise Contest Table"}
            data={quizData}
            columns={columns}
            options={options}
          />
        </>
      

    </Box>
  );
}
