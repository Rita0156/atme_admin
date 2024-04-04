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
      label: "Contests",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { width: "150px" } }),

        customBodyRender: (value) => {
          return (
            <Box style={{marginRight:"180px", marginLeft:"40px"}}>
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

        customBodyRender: (value) => {
          return (
            <Box style={{marginRight:"80px", marginLeft:"40px"}}>
              <span>{value? value : ""}</span>
            </Box>
          );
        },
      },
    },

    {
      name: "winningCoins",
      label: "Contest Name",
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
    onRowClick: (rowData) => {
      navigate(`/product/${rowData[0]}`);
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
      <Container>
        <>
          <AddnewRowTable />

          <MUIDataTable
            title={"Category Wise Contest Table"}
            data={quizData}
            columns={columns}
            options={options}
          />
        </>
      </Container>
    </Box>
  );
}
