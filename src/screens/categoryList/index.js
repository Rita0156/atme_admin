import React, { useEffect } from "react";
import { useState } from "react";
// material
import { Box, Container } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
// import AddnewRowTable from "../../components/addTablerow.js";
import axios from "axios";
import DeleteEditeTableTooltip from "../../components/updateAndDelete/index.js";
// import AddEditCategoryForm from "../../components/editAddForm/index.js";
import AddCategoryRow from "../../components/addCategoryRow/index.js";

export default function CategoryList() {
  const [page, setPage] = useState(0);
  const [quizData, setQuizdata] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const { data } = await axios.get(
      "https://atme-quiz.onrender.com/api/contests/category/CONTEST"
    );
    setQuizdata(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "id",
      label: "id",
      display: true,
      options: {
        filter: false,
        display: quizData._id,

        viewColumns: false,
        customBodyRender: (value) => value,
      },
    },
    {
      name: "quizImage",
      label: "Quizes",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { width: "150px", paddingLeft:"40px" , paddingRight:"200px" } }),

        customBodyRender: (value) => {
          return (
            <Box>
              <img alt="" src={value} />
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
      console.log(rowData, "rowdata");
      navigate(`/contests/${rowData[2]}`);
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
        <Container>
          <AddCategoryRow />

          <MUIDataTable
            title={"Category Table"}
            data={quizData}
            columns={columns}
            options={options}
            
          />
        </Container>
      </>
    </Box>
  );
}
