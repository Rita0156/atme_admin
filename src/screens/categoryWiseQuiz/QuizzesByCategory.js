import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
// material
import { Box, Container } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import AddnewRowTable from "../../components/quizes/addTablerow.js/AddnewRowTable.js";
import DeleteEditeTableTooltip from "../../components/updateAndDelete/DeleteEditeTableTooltip.js";
import axios from "axios";
import Layout1 from "../../components/layout/Layout.js";

export default function QuizzesByCategory() {
  const name = useParams();
  const [page, setPage] = useState(0);
  const [quizData, setQuizdata] = useState([]);
  const [fromCategory, setFromCategory] = useState(true);
  const navigate = useNavigate();

  const [image, setImage] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://atme-quiz.onrender.com/api/contests/category/${name.id}`
        );
        setImage(data.quizImage);
        setQuizdata(data.quizzes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const columns = [
    {
      name: "id",
      label: "id",
      display: true,
      options: {
        filter: false,
        display: quizData?.id,

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
        setCellProps: () => ({
          style: { width: "150px", paddingLeft: "40px", paddingRight: "160px" },
        }),

        customBodyRender: (value) => {
          return (
            <Box>
              <img alt="" src={image} />
            </Box>
          );
        },
      },
    },
    {
      name: "name.id",
      label: "Category Name",
      display: true,
      options: {
        filter: false,
        sort: true,

        customBodyRender: (value) => name.id,
      },
    },

    {
      name: "name",
      label: "Quiz Name",
      display: true,
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => value,
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
      <Layout1 headerTitle={` ${name.id}  Quizes `} />
      <>
        <Container>
          <AddnewRowTable />

          <MUIDataTable
            title={` ${name.id}  Quizes `}
            data={quizData}
            columns={columns}
            options={options}
          />
        </Container>
      </>
    </Box>
  );
}
