import React, { useEffect } from "react";
import { useState } from "react";
// material
import { Box, Container } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import DeleteEditeTableTooltip from "../../components/updateAndDelete/DeleteEditeTableTooltip.js";
import axios from "axios";
import Layout1 from "../../components/layout/Layout.js";

export default function QuizList() {
  const [page, setPage] = useState(0);
  const [quizData, setQuizdata] = useState([]);
  const [fromCategory, setFromCategory] = useState(true);
  const navigate = useNavigate();

  
  const getData = async () => {
    const { data } = await axios.get(
      "https://atme-quiz.onrender.com/api/contests"
    );
    setQuizdata(data);
    console.log(data, ' ddddddddddddddddddd')
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
      label: "Contests",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { width: "150px" } }),

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
      name: "name",
      label: "Contest Name",
      display: true,
      options: {
        filter: true,
        sort: true,
        // view?.state,
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
    onRowClick: (rowData) => {},
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
      <Layout1 headerTitle={"All Quiz"} />
      <Container>
        <>
          <MUIDataTable
            title={"Contests Table"}
            data={quizData}
            columns={columns}
            options={options}
          />
        </>
      </Container>
    </Box>
  );
}
