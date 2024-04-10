import React, { useEffect } from "react";
import { useState } from "react";
// material
import { Box, Container } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
// import AddnewRowTable from "../../components/addTablerow.js";
import axios from "axios";
import DeleteEditeTableTooltip from "../../components/updateAndDelete/DeleteEditeTableTooltip.js";
// import AddEditCategoryForm from "../../components/editAddForm/index.js";
import AddCategoryRow from "../../components/category/addCategoryRow/AddCategoryRow.js";
import Layout1 from "../../components/layout/Layout.js";

export default function CategoryList() {
  const [page, setPage] = useState(0);
  const [quizData, setQuizdata] = useState([]);
  const [fromCategory, setFromCategory] = useState(false);
  const navigate = useNavigate();



  const getData = async () => {
    const { data } = await axios.get(
      "https://atme-quiz.onrender.com/api/contests/all/category"
    );
   
    setQuizdata(data);
    localStorage.setItem("quizData", JSON.stringify(data));
    
    
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "quizImage",
      label: "Quizes",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: { width: "100px", height:"35px", paddingLeft: "40px", paddingRight: "200px" },
        }),

        customBodyRender: (value) => {
          return (
            <Box >
              <img alt="" src={value} style={{width:"70px" , height:"50px"}}/>
            </Box>
          );
        },
      },
    },
    {
      name: "category",
      label: "Category Name",
      display: true,
      options: {
        filter: false,
        sort: true,

        customBodyRender: (value) => (value ? value : "-"),
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
            <DeleteEditeTableTooltip
              fromCategory={fromCategory}
              productDetails={quizData}
              tableMeta={tableMeta}
            />
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

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    onRowClick: (rowData) => {
   
      navigate(`/contests/${rowData[1]}`);
    },

    onViewColumnsChange: (changedColumn, action) => {},
    page: page,
    onTableChange: (action, tableState) => {
      handlePageChange(action, tableState.page);
    },
    setRowProps: (row) => {
      return { style: { height: "75px" } };
    },
  };

  return (
    <Box>
      <>
        <Layout1 headerTitle={"All Category"} />
        <Container>
          <AddCategoryRow />

          <MUIDataTable
            title={"Category Table"}
            style={{marginLeft:"-49px"}}
            data={quizData}
            columns={columns}
            options={options}
          />

        </Container>
      </>
    </Box>
  );
}
