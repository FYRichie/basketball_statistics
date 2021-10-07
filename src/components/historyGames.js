import {
    Snackbar,
    TableContainer,
    TableRow,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TablePagination,
    Container,
    Grid,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { findGame } from "../api";
import moment from "moment";

const columns = [
    {
        id: "date",
        label: "DATE",
        minWidth: 100,
        format: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
    },
    { id: "opponent", label: "OPPONENT", minWidth: 400 },
];
export default function HistoryGames() {
    const [alert, setAlert] = useState({});
    const [gameData, setGameData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const history = useHistory();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleEnterGame = (id) => {
        history.push(`/game/${id}`);
    };
    const handleGameReload = async () => {
        try {
            const data = await findGame();
            console.log(data);
            setGameData(data);
        } catch (err) {
            setAlert({
                open: true,
                severity: "error",
                msg: "Failed to load game data.",
            });
        }
    };
    useEffect(() => handleGameReload(), []);
    return (
        <Container>
            <Grid>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gameData
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            onClick={() =>
                                                handleEnterGame(row._id)
                                            }
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        align={column.align}
                                                    >
                                                        {column.format
                                                            ? column.format(
                                                                  value
                                                              )
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={gameData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={alert?.open}
                    autoHideDuration={3000}
                    onClose={() => setAlert({ ...alert, open: false })}
                >
                    <Alert variant="filled" severity={alert?.severity}>
                        {alert?.msg}
                    </Alert>
                </Snackbar>
            </Grid>
        </Container>
    );
}
