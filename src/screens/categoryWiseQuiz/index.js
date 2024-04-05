import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
// material
import { Box, Container } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import AddnewRowTable from "../../components/addTablerow.js";
import DeleteEditeTableTooltip from "../../components/updateAndDelete/index.js";
import axios from "axios";

export default function QuizzesByCategory() {
  const name = useParams();
  const [page, setPage] = useState(0);
  const [quizData, setQuizdata] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const { data } = await axios.get(
      "https://atme-quiz.onrender.com/api/contests/category/" + `${name.id}`
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
        setCellProps: () => ({ style: { width: "150px" , paddingLeft:"40px", paddingRight:"160px" } }),

        customBodyRender: (value) => {
          return (
            <Box>
              <img  alt="" src={value} />
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
      label: "Quiz Name",
      display: true,
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => "Play and Win " + value,
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
          <AddnewRowTable />

          <MUIDataTable
            title={"Category Wise Quiz Table"}
            data={quizData}
            columns={columns}
            options={options}
          />
        </Container>
      </>
    </Box>
  );
}
